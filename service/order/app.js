import { getKafkaConsumer, getMysqlClient } from "./setup.js";

(async () => {
    const kafkaConsumer = await getKafkaConsumer();
    const mysqlConn = getMysqlClient();
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

    console.log("Order service is running");
})();
