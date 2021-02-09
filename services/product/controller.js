export function createProduct(req, res) {
    const keys = ["name", "price", "description"];
    const body = req.body;
    if (!keys.every((item) => item in body)) {
        res.status(400).send("Missing product info");
    }
    const { mysqlClient } = req.app.locals;
    const data = {};
    keys.forEach((key) => {
        data[key] = body[key];
    });
    mysqlClient.query(
        "INSERT INTO products SET ?",
        data,
        (error, results, fields) => {
            if (error) {
                res.status(500).send("Registration failed");
            }
            res.status(200).send(`Product registered, id: ${results.insertId}`);
        }
    );
}

export function getProductById(req, res) {
    const { id } = req.params;
    const { mysqlClient } = req.app.locals;
    mysqlClient.query(
        `SELECT * FROM products WHERE id = ${id};`,
        (error, results, fields) => {
            console.log(results);
            console.log(fields);
            if (error) {
                res.status(500).send("Lookup failed");
            }

            const statusCode = results.length > 0 ? 200 : 404;
            res.status(statusCode).send(results[0]);
        }
    );
}

export function getProducts(req, res) {
    const { mysqlClient } = req.app.locals;
    mysqlClient.query(`SELECT * FROM products;`, (error, results, fields) => {
        console.log(results);
        console.log(fields);
        if (error) {
            res.status(500).send("Lookup failed");
        }

        res.status(200).send(results);
    });
}
