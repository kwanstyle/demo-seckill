import { kafkaConsumer, mysqlConn } from "./setup.js";

kafkaConsumer.on("message", (msg) => {
    console.log(msg);
});

console.log("Service node is running");
