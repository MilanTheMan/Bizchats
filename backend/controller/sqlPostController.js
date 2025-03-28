const mysqlController = require('./mysqlController');
const { uploadFile } = require('./awsController');

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
        const { name, role_id, profile_picture, userId, category } = req.body;
        let finalProfilePicture = profile_picture;

        if (!finalProfilePicture) {
            const randomNumber = Math.floor(Math.random() * 30) + 1;
            finalProfilePicture = `https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(${randomNumber}).jpg`;
        }

        const query = "INSERT INTO channels (name, role_id, category, profile_picture) VALUES (?, ?, ?, ?)";

        sqlConnection.query(query, [name, role_id, category, finalProfilePicture], (err, result, fields) => {
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

async function updateUserRole(req, res) {
    try {
        const { userId, channelId, roleId } = req.body;
        const query = "UPDATE userstochannels SET channelroleid = ? WHERE userid = ? AND channelid = ?";

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
        const query = "INSERT INTO friends (user_id, friend_id) VALUES (?, ?), (?, ?)";

        sqlConnection.query(query, [user_id, friend_id, friend_id, user_id], (err, result, fields) => {
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

async function updateUserEmail(req, res) {
    try {
        const { userId, newEmail } = req.body;
        const query = "UPDATE users SET email = ? WHERE id = ?";

        sqlConnection.query(query, [newEmail, userId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Email updated successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function resetUserPassword(req, res) {
    try {
        const { userId, newPassword } = req.body;
        const query = "UPDATE users SET password = ? WHERE id = ?";

        sqlConnection.query(query, [newPassword, userId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Password reset successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function updateProfilePicture(req, res) {
    try {
        const { userId, profilePicture } = req.body;
        const fileType = profilePicture.split(';')[0].split('/')[1];
        const contact_name = "user"; // You can replace this with actual user name if available

        const s3Url = await uploadImg(profilePicture, fileType, contact_name, userId, 'profile_pictures', 'profile');

        const query = "UPDATE users SET profile_picture = ? WHERE id = ?";
        sqlConnection.query(query, [s3Url, userId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Profile picture updated successfully", profilePictureUrl: s3Url });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function uploadAttachment(req, res) {
    try {
        const { base64, fileType, userId, channelId, assignmentId } = req.body;
        console.log(`Uploading attachment for user ${userId} in channel ${channelId} for assignment ${assignmentId}`);

        const channelQuery = "SELECT name FROM channels WHERE id = ?";
        const assignmentQuery = "SELECT title FROM channel_assignments WHERE id = ?";

        const [channelResult] = await sqlConnection.promise().query(channelQuery, [channelId]);
        const [assignmentResult] = await sqlConnection.promise().query(assignmentQuery, [assignmentId]);

        if (!channelResult.length || !assignmentResult.length) {
            throw new Error('Channel or Assignment not found');
        }

        const channelName = channelResult[0].name;
        const assignmentName = assignmentResult[0].title;

        const s3Url = await uploadFile(base64, fileType, 'assignment', assignmentId, channelName, assignmentName);

        const query = "INSERT INTO submission_attachments (channel_id, assignment_id, user_id, attachment_link) VALUES (?, ?, ?, ?)";
        await sqlConnection.promise().query(query, [channelId, assignmentId, userId, s3Url]);

        res.status(201).json({ message: "Attachment uploaded successfully", attachmentUrl: s3Url });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function addComment(req, res) {
    try {
        const { userId, channelId, assignmentId, comments } = req.body;
        console.log(`Adding comment for user ${userId} in channel ${channelId} for assignment ${assignmentId}`);
        const query = "INSERT INTO assignment_submissions (channel_id, assignment_id, comments, user_id) VALUES (?, ?, ?, ?)";

        sqlConnection.query(query, [channelId, assignmentId, comments, userId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(201).json({ message: "Comment added successfully" });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

async function submitMark(req, res) {
    try {
        const { channelId, userId, assignmentId, mark } = req.body;

        const deleteQuery = `
            DELETE FROM channel_marks_assignments
            WHERE channel_id = ? AND user_id = ? AND assignment_id = ?`;
        await sqlConnection.promise().query(deleteQuery, [channelId, userId, assignmentId]);

        const insertQuery = `
            INSERT INTO channel_marks_assignments (channel_id, user_id, assignment_id, mark)
            VALUES (?, ?, ?, ?)`;
        await sqlConnection.promise().query(insertQuery, [channelId, userId, assignmentId, mark]);

        res.status(200).json({ message: "Mark submitted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

async function submitResults(req, res) {
    try {
        const { channelId } = req.body;

        const query = `
            INSERT INTO channel_marks_users (channel_id, user_id, average_mark)
            SELECT
                channel_id,
                user_id,
                AVG(mark) AS average_mark
            FROM channel_marks_assignments
            WHERE channel_id = ?
            GROUP BY user_id
            ON DUPLICATE KEY UPDATE average_mark = VALUES(average_mark)`;

        await sqlConnection.promise().query(query, [channelId]);

        res.status(200).json({ message: "Results submitted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

async function createChannelMessage(req, res) {
    try {
        const { userId, channelId, content } = req.body;
        const query = "INSERT INTO channel_messages (user_id, channel_id, content) VALUES (?, ?, ?)";

        sqlConnection.query(query, [userId, channelId, content], (err, result, fields) => {
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
    deleteFriend,
    updateUserEmail,
    resetUserPassword,
    updateProfilePicture,
    uploadAttachment,
    addComment,
    submitMark,
    submitResults,
    createChannelMessage
};
