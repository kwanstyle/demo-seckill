import kafka from "kafka-node";
import mysql from "mysql";

export async function getKafkaConsumer() {
    const topic = "order";
    const kafkaClient = new kafka.KafkaClient({
        kafkaHost: "192.168.2.11:9092",
    });
    let isTopicReady = false;
    while (!isTopicReady) {
        await delay(2000);
        kafkaClient.loadMetadataForTopics([topic], (err, data) => {
            if (err) {
                console.error(
                    `Cannot find topic ${topic}, retrying after 2 seconds...`
                );
            } else {
                isTopicReady = true;
                console.log(`Topic metadata: ${JSON.stringify(data)}`);
            }
        });
    }

    const kafkaConsumer = new kafka.Consumer(
        kafkaClient,
        [
            {
                topic,
                partition: 0,
            },
        ],
        {
            autoCommit: true,
        }
    );

    return kafkaConsumer;
}

export function getMysqlConn() {
    const mysqlConn = mysql.createConnection({
        host: "192.168.2.11",
        port: 3306,
        user: "root",
        password: "root",
        database: "seckill",
    });
    mysqlConn.connect();
    return mysqlConn;
}

async function delay(ms) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
}
