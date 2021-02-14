import mysql from "mysql";

export default function getMysqlClient() {
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
