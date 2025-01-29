async function getAllUsers(req, res) {
    try {
        const { data } = req.body;
        const query = "SELECT * from users";

        const { user } = data;

        sqlConnection.query(query, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else if (result) {
                res.send({ data: result });
            } else {
                res.status(500).json({ error: "something went wrong" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getUserById(req, res) {
    try {
        const { data } = req.body;
        const query = "SELECT * from users where id = ?";

        sqlConnection.query(query, [data], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else if (result) {
                res.send({ data: result });
            } else {
                res.status(500).json({ error: "something went wrong" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getUserByEmail(req, res) {
    try {
        const { data } = req.body;
        const query = "SELECT * from users where email = ?";

        sqlConnection.query(query, [data], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else if (result) {
                res.send({ data: result });
            } else {
                res.status(500).json({ error: "something went wrong" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const query = "SELECT * from users where email = ?";

        sqlConnection.query(query, [email], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else if (result.length > 0) {
                const user = result[0];
                if (user.password === password) {
                    res.send({ data: user });
                } else {
                    res.status(401).json({ error: "Invalid password" });
                }
            } else {
                res.status(404).json({ error: "User not found" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}