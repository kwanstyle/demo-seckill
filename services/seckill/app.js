import express from "express";
import handler from "./controller.js";
import { redisClient, kafkaProducer } from "./setup.js";

const app = express();
const port = 8080;

app.locals.redisClient = redisClient;
app.locals.kafkaProducer = kafkaProducer;

app.get("/", handler);

app.listen(port, () => {
    console.log(`Seckill app listening at http://localhost:${port}`);
});
