const sqlConnection = require('./mysqlController').connect;

async function getAllUsers(req, res) {
    try {
        const { data } = req.body;
        const query = "SELECT * from users";

        const { user } = data;

        const sqlConnection = await mysqlController.connect();
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

        const sqlConnection = await mysqlController.connect();
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

        const sqlConnection = await mysqlController.connect();
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
        console.log(`Login attempt for email: ${email}`);
        const query = "SELECT * from users where email = ?";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [email], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else if (result.length > 0) {
                const user = result[0];
                console.log(`User found: ${user.email}`);
                if (user.password === password) {
                    const { password, ...userWithoutPassword } = user;
                    res.send({ data: userWithoutPassword });
                } else {
                    console.log('Invalid password');
                    res.status(401).json({ error: "Invalid password" });
                }
            } else {
                console.log('User not found');
                res.status(404).json({ error: "User not found" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getUserChannels(req, res) {
    try {
        const { userId } = req.body;
        const query = `
            SELECT channels.*, userstochannels.channelroleid as role
            FROM channels 
            INNER JOIN userstochannels ON channels.id = userstochannels.channelid 
            WHERE userstochannels.userid = ?`;

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [userId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.send({ data: result });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChannelById(req, res) {
    try {
        const { channelId } = req.body;
        const query = "SELECT * from channels where id = ?";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.send({ data: result[0] });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChannelAnnouncements(req, res) {
    try {
        const { channelId } = req.body;
        const query = "SELECT * from channel_announcements where channel_id = ?";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.send({ data: result });
            }
        });
    } catch (err) {
        res.status 500).json({ err: err });
    }
}

async function getChannelAssignments(req, res) {
    try {
        const { channelId } = req.body;
        const query = "SELECT * from channel_assignments where channel_id = ?";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.send({ data: result });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChannelMarks(req, res) {
    try {
        const { channelId } = req.body;
        const query = "SELECT * from channel_marks where channel_id = ?";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.send({ data: result });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChannelMembers(req, res) {
    try {
        const { channelId } = req.body;
        const query = `
            SELECT users.id, users.name, users.email, userstochannels.channelroleid as role
            FROM users
            INNER JOIN userstochannels ON users.id = userstochannels.userid
            WHERE userstochannels.channelid = ?`;

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.send({ data: result });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    login,
    getUserChannels,
    getChannelById,
    getChannelAnnouncements,
    getChannelAssignments,
    getChannelMarks,
    getChannelMembers
};