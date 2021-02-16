import mysql from "mysql";
import Memcached from "memcached";

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

export function getMemcachedClient() {
    const memcachedClient = new Memcached("memcached:11211");
    return memcachedClient;
}
