export default (req, res) => {
    const { redisClient } = req.app.locals;
    handler(redisClient, res);
};

function handler(redisClient, res) {
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
                handler(redisClient, res);
                return;
            }
            res.status(200).send(`${result} items left.`);
        });
    });
}
