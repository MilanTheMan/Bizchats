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

async function updateChannel(req, res) {
    try {
        const { channelId, name, profile_picture } = req.body;

        let profilePictureUrl = null;
        if (profile_picture) {
            const fileType = profile_picture.split(';')[0].split('/')[1];
            profilePictureUrl = await uploadImg(profile_picture, fileType, 'channel', channelId, 'channels/wallpapers/uploaded', 'profile');
        }

        const query = "UPDATE channels SET name = ?, profile_picture = ? WHERE id = ?";
        sqlConnection.query(query, [name, profilePictureUrl, channelId], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Channel updated successfully", profilePictureUrl });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

module.exports = {
    updateAnnouncement,
    updateAssignment,
    updateChannel
};
