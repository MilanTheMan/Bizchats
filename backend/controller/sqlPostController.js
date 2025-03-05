const mysqlController = require('./mysqlController');

async function signup(req, res) {
    try {
        const { name, email, password, role_id, profile_picture } = req.body;
        console.log(`Signup attempt for email: ${email}`);
        const query = "INSERT INTO users (name, email, password, role_id, profile_picture) VALUES (?, ?, ?, ?, ?)";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [name, email, password, role_id, profile_picture], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                const userId = result.insertId;
                const userWithoutPassword = { id: userId, name, email, role_id, profile_picture };
                
                // Add user to default channels as an administrator
                const defaultChannels = [1, 2, 3, 4, 5]; // IDs of default channels
                const linkQuery = "INSERT INTO userstochannels (userid, channelid, channelroleid) VALUES (?, ?, 2)"; // 2 for 'administrator'
                
                defaultChannels.forEach(channelId => {
                    sqlConnection.query(linkQuery, [userId, channelId], (linkErr, linkResult, linkFields) => {
                        if (linkErr) {
                            console.log(linkErr);
                        }
                    });
                });

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
        let finalProfilePicture = profile_picture;

        if (!finalProfilePicture) {
            const randomNumber = Math.floor(Math.random() * 30) + 1;
            finalProfilePicture = `https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(${randomNumber}).jpg`;
        }

        const query = "INSERT INTO channels (name, role_id, profile_picture) VALUES (?, ?, ?)";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [name, role_id, finalProfilePicture], (err, result, fields) => {
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

        const sqlConnection = await mysqlController.connect();
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

        const sqlConnection = await mysqlController.connect();
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

        const sqlConnection = await mysqlController.connect();
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

async function updateUserRole(req, res) {
    try {
        const { userId, channelId, roleId } = req.body;
        const query = "UPDATE userstochannels SET channelroleid = ? WHERE userid = ? AND channelid = ?";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [roleId, userId, channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "User role updated successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function removeMember(req, res) {
    try {
        const { userId, channelId, memberId } = req.body;
        const roleQuery = "SELECT channelroleid FROM userstochannels WHERE userid = ? AND channelid = ?";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(roleQuery, [userId, channelId], (roleErr, roleResult, roleFields) => {
            if (roleErr) {
                console.log(roleErr);
                res.status(500).json({ error: roleErr });
            } else if (roleResult.length > 0 && (roleResult[0].channelroleid === 1 || roleResult[0].channelroleid === 2)) { // 1 for 'owner', 2 for 'administrator'
                const memberRoleQuery = "SELECT channelroleid FROM userstochannels WHERE userid = ? AND channelid = ?";
                sqlConnection.query(memberRoleQuery, [memberId, channelId], (memberRoleErr, memberRoleResult, memberRoleFields) => {
                    if (memberRoleErr) {
                        console.log(memberRoleErr);
                        res.status(500).json({ error: memberRoleErr });
                    } else if (memberRoleResult.length > 0 && memberRoleResult[0].channelroleid > roleResult[0].channelroleid) {
                        const query = "DELETE FROM userstochannels WHERE userid = ? AND channelid = ?";
                        sqlConnection.query(query, [memberId, channelId], (err, result, fields) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ error: err });
                            } else {
                                res.status(200).json({ message: "Member removed successfully" });
                            }
                        });
                    } else {
                        res.status(403).json({ error: "Permission denied" });
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

async function createChat(req, res) {
    try {
        const { sender_id, receiver_id, content } = req.body;
        const query = "INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [sender_id, receiver_id, content], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(201).json({ message: "Message sent successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChats(req, res) {
    try {
        const { userId } = req.body;
        const query = `
            SELECT messages.*, sender.name as sender_name, receiver.name as receiver_name
            FROM messages
            INNER JOIN users as sender ON messages.sender_id = sender.id
            INNER JOIN users as receiver ON messages.receiver_id = receiver.id
            WHERE sender_id = ? OR receiver_id = ?
            ORDER BY creation_date ASC`;

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [userId, userId], (err, result, fields) => {
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

async function addFriend(req, res) {
    try {
        const { user_id, friend_id } = req.body;
        const query = "INSERT INTO friends (user_id, friend_id) VALUES (?, ?)";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [user_id, friend_id], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(201).json({ message: "Friend added successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getFriends(req, res) {
    try {
        const { user_id } = req.body;
        const query = `
            SELECT users.id, users.name, users.email
            FROM friends
            INNER JOIN users ON friends.friend_id = users.id
            WHERE friends.user_id = ?`;

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [user_id], (err, result, fields) => {
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

async function deleteFriend(req, res) {
    try {
        const { user_id, friend_id } = req.body;
        const query = "DELETE FROM friends WHERE user_id = ? AND friend_id = ?";

        const sqlConnection = await mysqlController.connect();
        sqlConnection.query(query, [user_id, friend_id], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Friend deleted successfully" });
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
    createAssignment,
    updateUserRole,
    removeMember,
    createChat,
    getChats,
    addFriend,
    getFriends,
    deleteFriend
};
