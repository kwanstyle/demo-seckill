import express from "express";
import bodyParser from "body-parser";
import * as controllers from "./controller.js";
import { getMysqlClient, getMemcachedClient } from "./setup.js";

(() => {
    const app = express();
    const port = 8888;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.locals.mysqlClient = getMysqlClient();
    app.locals.memcachedClient = getMemcachedClient();

    app.post("/", controllers.createProduct);
    app.get("/", controllers.getProducts);
    app.get("/:id", controllers.getProductById);

    app.listen(port, () => {
        console.log(`Product service is listening at http://localhost:${port}`);
    });
})();
