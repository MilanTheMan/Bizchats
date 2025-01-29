


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