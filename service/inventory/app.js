import express from "express";
import bodyParser from "body-parser";
import * as controllers from "./controller.js";
import { getMysqlClient, getRedisClient } from "./setup.js";

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.locals.mysqlClient = getMysqlClient();
app.locals.redisClient = getRedisClient();

app.post("/", controllers.createInventory);
app.put("/:id", controllers.updateInventory);
app.get("/:id", controllers.getInventoryById);

app.listen(port, () => {
    console.log(`Inventory service is listening at http://localhost:${port}`);
});
