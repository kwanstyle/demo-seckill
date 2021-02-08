import mysql from "mysql";

const mysqlClient = mysql.createConnection({
    host: "192.168.2.11",
    port: 3306,
    user: "root",
    password: "root",
    database: "product",
});
mysqlClient.connect();

export default mysqlClient;
