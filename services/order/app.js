import { getKafkaConsumer, getMysqlConn } from "./setup.js";

const kafkaConsumer = await getKafkaConsumer();
const mysqlConn = getMysqlConn();

(async () => {
    kafkaConsumer.on("message", (msg) => {
        const data = JSON.parse(msg.value);
        mysqlConn.query(
            "INSERT INTO orders SET ?",
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
