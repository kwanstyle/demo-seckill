export function createInventory(req, res) {
    const keys = ["product", "amount"];
    const body = req.body;
    if (!keys.every((item) => item in body)) {
        res.status(400).send("Missing inventory info");
        return;
    }
    const { product, amount } = body;
    const { mysqlClient, redisClient } = req.app.locals;
    mysqlClient.query(
        `SELECT * FROM products WHERE id=${product};`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).send("Lookup failed");
                return;
            } else if (results.length === 0) {
                res.status(404).send("Product not found");
                return;
            }

            redisClient.set(product, amount, (err, reply) => {
                if (err) {
                    res.status(500).send("Registration failed");
                    return;
                }

                res.status(200).send("Registration completed");
                return;
            });
        }
    );
}

export function getInventoryById(req, res) {
    const { id } = req.params;
    const { redisClient } = req.app.locals;
    redisClient.get(id, (err, reply) => {
        if (err) {
            res.status(500).send("Lookup failed");
            return;
        } else if (reply === null) {
            res.status(404).send("Product not found");
            return;
        }

        res.status(200).send(reply);
    });
}

export function updateInventory(req, res) {
    const { id } = req.params;
    let { amount } = req.body;
    if (!isPositiveInt(amount)) {
        res.status(400).send("Missing or invalid amount");
        return;
    }
    amount = parseInt(amount);
    const { redisClient } = req.app.locals;
    redisClient.get(id, (err, reply) => {
        if (err) {
            res.status(500).send("Lookup failed");
            return;
        } else if (reply === null) {
            res.status(404).send("Product not found");
            return;
        }
        updateInventoryHandler(redisClient, id, amount, res);
    });
}

function updateInventoryHandler(redisClient, id, amount, res) {
    redisClient.watch(id);
    redisClient.get(id, (err, reply) => {
        if (reply === null) {
            res.status(404).send("Product not found");
            return;
        }

        const steps = redisClient.multi();
        steps.set(id, amount);
        steps.exec((err, result) => {
            if (result === null) {
                console.log("Conflict! Retrying...");
                updateInventoryHandler(redisClient, id, amount, res);
                return;
            }

            res.status(200).send("Inventory updated");
            return;
        });
    });
}

function isPositiveInt(num) {
    return num >>> 0 === parseFloat(num);
}
