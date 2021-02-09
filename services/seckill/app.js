import express from "express";
import bodyParser from "body-parser";
import * as controllers from "./controller.js";
import { redisClient, kafkaProducer } from "./setup.js";

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.locals.redisClient = redisClient;
app.locals.kafkaProducer = kafkaProducer;

app.post("/", controllers.createSeckill);

app.listen(port, () => {
    console.log(`Seckill app listening at http://localhost:${port}`);
});
