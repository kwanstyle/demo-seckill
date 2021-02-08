import mysql from "mysql";
import redis from "redis";

function errorHandler(err) {
    console.error(err);
}

const redisClient = redis.createClient({
    host: "192.168.2.11",
});
redisClient.on("error", errorHandler);

const mysqlClient = mysql.createConnection({
    host: "192.168.2.11",
    port: 3306,
    user: "root",
    password: "root",
    database: "product",
});
mysqlClient.connect();

export { mysqlClient, redisClient };
