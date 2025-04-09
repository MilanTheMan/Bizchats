const mysqlController = require('./mysqlController');
const { uploadImg } = require('./awsController');

async function updateAnnouncement(req, res) {
    try {
        const { id, title, content } = req.body;
        const query = "UPDATE channel_announcements SET title = ?, content = ? WHERE id = ?";

        sqlConnection.query(query, [title, content, id], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Announcement updated successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function updateAssignment(req, res) {
    try {
        const { id, title, description, due_date } = req.body;
        const query = "UPDATE channel_assignments SET title = ?, description = ?, due_date = ? WHERE id = ?";

        sqlConnection.query(query, [title, description, due_date, id], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Assignment updated successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function updateChannelName(req, res) {
    try {
        const { channelId, name } = req.body;

        const query = "UPDATE channels SET name = ? WHERE id = ?";
        sqlConnection.query(query, [name, channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Channel name updated successfully" });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

async function updateChannelPicture(req, res) {
    try {
        const { channelId, profile_picture } = req.body;

        let profilePictureUrl = null;
        if (profile_picture) {
            const fileType = profile_picture.split(';')[0].split('/')[1];
            profilePictureUrl = await uploadImg(profile_picture, fileType, 'channel', channelId, 'channels/wallpapers/uploaded', 'profile');
        }

        const query = "UPDATE channels SET profile_picture = ? WHERE id = ?";
        sqlConnection.query(query, [profilePictureUrl, channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Channel profile picture updated successfully", profilePictureUrl });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

async function updateChannelRole(req, res) {
    try {
        const { channelId, memberId, newRoleId } = req.body;
        const query = "UPDATE userstochannels SET channelroleid = ? WHERE channelid = ? AND userid = ?";
        await sqlConnection.promise().query(query, [newRoleId, channelId, memberId]);
        res.status(200).json({ message: "Role updated successfully" });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

module.exports = {
    updateAnnouncement,
    updateAssignment,
    updateChannelName,
    updateChannelPicture,
    updateChannelRole
};
