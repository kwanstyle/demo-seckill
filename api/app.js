import express from "express";
import redis from "redis";
import kafka from "kafka-node";
import handler from "./controller.js";

const app = express();
const port = 8080;

app.get("/", handler);

const redisClient = redis.createClient({
    host: "192.168.2.11",
});
redisClient.on("error", (err) => {
    console.error(err);
    res.status(500).send(err);
});

app.locals.redisClient = redisClient;
// app.locals.kafkaClient = new kafka.KafkaClient();
// app.locals.kafkaProducer = new kafka.Producer(app.locals.kafkaClient);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
