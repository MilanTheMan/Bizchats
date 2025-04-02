const express = require('express');
const router = express.Router();
const mysqlController = require('./mysqlController');
const sqlPostController = require('./sqlPostController');

async function getAllUsers(req, res) {
    try {
        const { data } = req.body;
        const query = "SELECT * from users";

        const [result] = await sqlConnection.promise().query(query);

        res.send({ data: result });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getUserById(req, res) {
    try {
        const { data } = req.body;
        const query = "SELECT * from users where id = ?";

        const [result] = await sqlConnection.promise().query(query, [data]);

        res.send({ data: result });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getUserByEmail(req, res) {
    try {
        const { data } = req.body;
        const query = "SELECT * from users where email = ?";

        const [result] = await sqlConnection.promise().query(query, [data]);

        res.send({ data: result });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for email: ${email}`);
        const query = "SELECT * from users where email = ?";

        const [result] = await sqlConnection.promise().query(query, [email]);

        if (result.length > 0) {
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
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getUserChannels(req, res) {
    try {
        const { userId } = req.body;
        const query = `
            SELECT channels.*, userstochannels.channelroleid as role, channels.category
            FROM channels
            INNER JOIN userstochannels ON channels.id = userstochannels.channelid
            WHERE userstochannels.userid = ?`;

        const [result] = await sqlConnection.promise().query(query, [userId]);

        res.send({ data: result });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChannelById(req, res) {
    try {
        const { channelId } = req.body;
        const query = "SELECT * from channels where id = ?";

        const [result] = await sqlConnection.promise().query(query, [channelId]);

        res.send({ data: result[0] });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChannelAnnouncements(req, res) {
    try {
        const { channelId } = req.body;
        const query = "SELECT * from channel_announcements where channel_id = ?";

        const [result] = await sqlConnection.promise().query(query, [channelId]);

        res.send({ data: result });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChannelAssignments(req, res) {
    try {
        const { channelId } = req.body;
        const query = "SELECT * from channel_assignments where channel_id = ?";

        const [result] = await sqlConnection.promise().query(query, [channelId]);

        res.send({ data: result });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChannelMarks(req, res) {
    try {
        const { channelId } = req.body;
        const query = `
            SELECT
                channel_marks_assignments.assignment_id,
                channel_marks_assignments.user_id,
                channel_marks_assignments.mark
            FROM channel_marks_assignments
            WHERE channel_marks_assignments.channel_id = ?`;

        const [result] = await sqlConnection.promise().query(query, [channelId]);

        res.send({ data: result });
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

        const [result] = await sqlConnection.promise().query(query, [channelId]);

        res.send({ data: result });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getChannelMessages(req, res) {
    try {
        const { channelId } = req.body;


        const query = `
            SELECT channel_messages.*, users.name as sender_name
            FROM channel_messages
            INNER JOIN users ON channel_messages.user_id = users.id
            WHERE channel_messages.channel_id = ?
            ORDER BY channel_messages.creation_date ASC
        `;

        const [result] = await sqlConnection.promise().query(query, [channelId]);

        res.send({ data: result });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
}

async function getSubmissionDetails(req, res) {
    try {
        const { userId, assignmentId } = req.body;
        const query = `
            SELECT assignment_submissions.*, submission_attachments.attachment_link
            FROM assignment_submissions
            LEFT JOIN submission_attachments ON assignment_submissions.id = submission_attachments.assignment_id
            WHERE assignment_submissions.user_id = ? AND assignment_submissions.assignment_id = ?`;

        const [result] = await sqlConnection.promise().query(query, [userId, assignmentId]);

        res.send({ data: result });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function getSubmissions(req, res) {
    try {
        const { channelId } = req.body;
        const query = `
            SELECT assignment_submissions.*, users.name as user_name, channel_assignments.title as assignment_title
            FROM assignment_submissions
            INNER JOIN users ON assignment_submissions.user_id = users.id
            INNER JOIN channel_assignments ON assignment_submissions.assignment_id = channel_assignments.id
            WHERE assignment_submissions.channel_id = ?`;

        const [result] = await sqlConnection.promise().query(query, [channelId]);

        res.send({ data: result });
    } catch (err) {
        console.log(err);
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
    getChannelMembers,
    getChannelMessages,
    getSubmissionDetails,
    getSubmissions,
    getFriends
};