import kafka from "kafka-node";
import mysql from "mysql";

const kafkaClient = new kafka.KafkaClient({
    kafkaHost: "192.168.2.11:9092",
});
const kafkaConsumer = new kafka.Consumer(
    kafkaClient,
    [
        {
            topic: "counter",
            partition: 0,
        },
    ],
    {
        autoCommit: true,
    }
);

const mysqlConn = null;

/*mysql.createConnection({
    host: "192.168.2.11",
    port: 3306,
    user: "root",
    password: "root",
    database: "seckill",
});
mysqlConn.connect();*/

export { kafkaConsumer, mysqlConn };
