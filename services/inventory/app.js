import express from "express";
import bodyParser from "body-parser";
import * as controllers from "./controller.js";
import { mysqlClient, redisClient } from "./setup.js";

const app = express();
const port = 8084;

app.use(bodyParser.urlencoded({ extended: true }));
app.locals.mysqlClient = mysqlClient;
app.locals.redisClient = redisClient;

app.post("/", controllers.createInventory);
app.put("/:id", controllers.updateInventory);
app.get("/:id", controllers.getInventoryById);

app.listen(port, () => {
    console.log(`Inventory app listening at http://localhost:${port}`);
});
