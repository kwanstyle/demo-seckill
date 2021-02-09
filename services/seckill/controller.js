export function createSeckill(req, res) {
    const keys = ["user", "amount", "product"];
    const body = req.body;
    if (!keys.every((item) => item in body)) {
        res.status(400).send("Missing seckill info");
    } else if (!isPositiveInt(req.body.amount)) {
        res.status(400).send("Invalid amount");
    }

    const data = {};
    keys.forEach((key) => {
        data[key] = parseInt(body[key]);
    });
    const { redisClient, kafkaProducer } = req.app.locals;
    handler(redisClient, kafkaProducer, data, res);
}

function handler(redisClient, kafkaProducer, data, res) {
    const { product, amount } = data;
    redisClient.watch(product, (watchErr) => {
        if (watchErr) {
            res.status(500).send("Lookup failed");
            return;
        }

        redisClient.get(product, (getErr, reply) => {
            if (getErr) {
                res.status(500).send("Lookup failed");
                return;
            }

            if (reply === null) {
                res.status(404).send("Item not found");
                return;
            }

            if (parseInt(reply) < amount) {
                const msg =
                    parseInt(reply) < 1 ? "Sold out" : "Insufficient inventory";
                res.status(400).send(msg);
                return;
            }

            const steps = redisClient.multi();
            steps.decrby(product, amount);
            steps.exec((execErr, result) => {
                if (execErr) {
                    res.status(500).send("Execution failed");
                    return;
                }

                if (result === null) {
                    console.log("Conflict! Retrying...");
                    handler(redisClient, kafkaProducer, res);
                    return;
                }

                const payload = [
                    {
                        topic: "order",
                        messages: JSON.stringify(data),
                        partition: 0,
                    },
                ];
                kafkaProducer.send(payload, (err, data) => {
                    if (err) {
                        console.error("Failed to send the order");
                        res.status(500).send("Failed to send the order");
                        return;
                    }

                    console.log("Kafka producer: Order sent");
                    res.status(200).send(`Order sent. ${result} items left.`);
                });
            });
        });
    });
}

function isPositiveInt(num) {
    return num >>> 0 === parseFloat(num);
}
