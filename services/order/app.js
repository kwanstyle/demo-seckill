import { getKafkaConsumer, getMysqlConn } from "./setup.js";

const kafkaConsumer = await getKafkaConsumer();
const mysqlConn = getMysqlConn();

(async () => {
    kafkaConsumer.on("message", (msg) => {
        console.log(`Kafka consumer: ${msg}`);
        const data = {
            ItemsLeft: 100,
            Timestamp: new Date(),
        };
        mysqlConn.query(
            "INSERT INTO CustomLog SET ?",
            data,
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                }
                console.log(results);
            }
        );
    });

    console.log("Service node is running");
})();
