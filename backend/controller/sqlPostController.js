async function signup(req, res) {
    try {
        const { name, email, password, role_id, profile_picture } = req.body;
        console.log(`Signup attempt for email: ${email}`);
        const query = "INSERT INTO users (name, email, password, role_id, profile_picture) VALUES (?, ?, ?, ?, ?)";

        sqlConnection.query(query, [name, email, password, role_id, profile_picture], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                const userWithoutPassword = { name, email, role_id, profile_picture };
                res.status(201).json({ message: "User created successfully", data: userWithoutPassword });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function createChannel(req, res) {
    try {
        const { name, role_id, profile_picture, userId } = req.body;
        const query = "INSERT INTO channels (name, role_id, profile_picture) VALUES (?, ?, ?)";

        sqlConnection.query(query, [name, role_id, profile_picture], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                const channelId = result.insertId;
                const linkQuery = "INSERT INTO userstochannels (userid, channelid, channelroleid) VALUES (?, ?, 1)"; // 1 for 'owner'
                sqlConnection.query(linkQuery, [userId, channelId], (linkErr, linkResult, linkFields) => {
                    if (linkErr) {
                        console.log(linkErr);
                        res.status(500).json({ error: linkErr });
                    } else {
                        res.status(201).json({ message: "Channel created and joined successfully", channelId });
                    }
                });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function joinChannel(req, res) {
    try {
        const { userId, channelId } = req.body;
        const query = "INSERT INTO userstochannels (userid, channelid, channelroleid) VALUES (?, ?, 3)"; // 3 for 'member'

        sqlConnection.query(query, [userId, channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(201).json({ message: "Joined channel successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function createAnnouncement(req, res) {
    try {
        const { userId, channelId, title, content } = req.body;
        const roleQuery = "SELECT channelroleid FROM userstochannels WHERE userid = ? AND channelid = ?";
        
        sqlConnection.query(roleQuery, [userId, channelId], (roleErr, roleResult, roleFields) => {
            if (roleErr) {
                console.log(roleErr);
                res.status(500).json({ error: roleErr });
            } else if (roleResult.length > 0 && (roleResult[0].channelroleid === 1 || roleResult[0].channelroleid === 2)) { // 1 for 'owner', 2 for 'administrator'
                const query = "INSERT INTO channel_announcements (channel_id, title, content) VALUES (?, ?, ?)";
                sqlConnection.query(query, [channelId, title, content], (err, result, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        res.status(201).json({ message: "Announcement created successfully" });
                    }
                });
            } else {
                res.status(403).json({ error: "Permission denied" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function createAssignment(req, res) {
    try {
        const { userId, channelId, title, description, due_date } = req.body;
        const roleQuery = "SELECT channelroleid FROM userstochannels WHERE userid = ? AND channelid = ?";
        
        sqlConnection.query(roleQuery, [userId, channelId], (roleErr, roleResult, roleFields) => {
            if (roleErr) {
                console.log(roleErr);
                res.status(500).json({ error: roleErr });
            } else if (roleResult.length > 0 && (roleResult[0].channelroleid === 1 || roleResult[0].channelroleid === 2)) { // 1 for 'owner', 2 for 'administrator'
                const query = "INSERT INTO channel_assignments (channel_id, title, description, due_date) VALUES (?, ?, ?, ?)";
                sqlConnection.query(query, [channelId, title, description, due_date], (err, result, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        res.status(201).json({ message: "Assignment created successfully" });
                    }
                });
            } else {
                res.status(403).json({ error: "Permission denied" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

module.exports = {
    signup,
    createChannel,
    joinChannel,
    createAnnouncement,
    createAssignment
};
