export function createUser(req, res) {
    const keys = ["name"];
    const body = req.body;
    if (!keys.every((item) => item in body)) {
        res.status(400).send("Missing account info");
    }
    const { mysqlClient } = req.app.locals;
    const data = {};
    keys.forEach((key) => {
        data[key] = body[key];
    });
    mysqlClient.query(
        "INSERT INTO account SET ?",
        data,
        (error, results, fields) => {
            if (error) {
                res.status(500).send("Registration failed");
            }
            res.status(200).send(`Account registered, id: ${results.insertId}`);
        }
    );
}

export function getUserById(req, res) {
    const { id } = req.params;
    const { mysqlClient } = req.app.locals;
    mysqlClient.query(
        `SELECT * FROM account WHERE id = ${id};`,
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

export function getUsers(req, res) {
    const { mysqlClient } = req.app.locals;
    mysqlClient.query(`SELECT * FROM account;`, (error, results, fields) => {
        console.log(results);
        console.log(fields);
        if (error) {
            res.status(500).send("Lookup failed");
        }

        res.status(200).send(results);
    });
}
