const mysqlController = require('./mysqlController');

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

module.exports = {
    updateAnnouncement,
    updateAssignment
};
