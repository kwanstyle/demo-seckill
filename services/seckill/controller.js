export default (req, res) => {
    const { redisClient, kafkaProducer } = req.app.locals;
    handler(redisClient, kafkaProducer, res);
};

function handler(redisClient, kafkaProducer, res) {
    redisClient.watch("counter");
    redisClient.get("counter", (err, reply) => {
        if (reply === null) {
            res.status(404).send("Item not found");
            return;
        }

        if (parseInt(reply) < 1) {
            console.warn("Sold out");
            res.status(400).send("Sold out");
            return;
        }

        const steps = redisClient.multi();
        steps.decr("counter");
        steps.exec((err, result) => {
            if (result === null) {
                console.log("Conflict! Retrying...");
                handler(redisClient, kafkaProducer, res);
                return;
            }

            const payload = [
                {
                    topic: "order",
                    messages: `${result} items left.`,
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
                res.status(200).send(`${result} items left.`);
            });
        });
    });
}
