import redis from "redis";
import kafka from "kafka-node";

function errorHandler(err) {
    console.error(err);
}

const redisClient = redis.createClient({
    host: "redis",
});
const kafkaClient = new kafka.KafkaClient({
    kafkaHost: "kafka:9092",
});
const kafkaProducer = new kafka.Producer(kafkaClient);

redisClient.on("error", errorHandler);
kafkaProducer.on("error", errorHandler);

export { redisClient, kafkaProducer };
