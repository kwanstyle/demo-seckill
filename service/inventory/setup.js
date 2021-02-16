import mysql from "mysql";
import redis from "redis";

export function getRedisClient() {
    const redisClient = redis.createClient({
        host: "redis",
    });
    redisClient.on("error", (err) => console.error(err));
    return redisClient;
}

export function getMysqlClient() {
    const mysqlClient = mysql.createPool({
        connectionLimit: 10,
        host: "mysql",
        port: 3306,
        user: "root",
        password: "root",
        database: "product_db",
    });
    return mysqlClient;
}
