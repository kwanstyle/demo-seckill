import mysql from "mysql";
import redis from "redis";

export function getRedisClient() {
    const redisClient = redis.createClient({
        host: "192.168.2.11",
    });
    redisClient.on("error", (err) => console.error(err));
    return redisClient;
}

export function getMysqlClient() {
    const mysqlClient = mysql.createPool({
        connectionLimit: 10,
        host: "192.168.2.11",
        port: 3306,
        user: "root",
        password: "root",
        database: "product_db",
    });
    return mysqlClient;
}
