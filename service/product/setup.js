import mysql from "mysql";
import Memcached from "memcached";

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

export function getMemcachedClient() {
    const memcachedClient = new Memcached("192.168.2.11:11211");
    return memcachedClient;
}
