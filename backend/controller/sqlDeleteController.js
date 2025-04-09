const mysqlController = require('./mysqlController');

async function deleteAnnouncement(req, res) {
    try {
        const { id } = req.body;
        const query = "DELETE FROM channel_announcements WHERE id = ?";

        sqlConnection.query(query, [id], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Announcement deleted successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function deleteAssignment(req, res) {
    try {
        const { id } = req.body;
        const query = "DELETE FROM channel_assignments WHERE id = ?";

        sqlConnection.query(query, [id], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "Assignment deleted successfully" });
            }
        });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function deleteChannelDocument(req, res) {
    try {
        const { documentId } = req.body;
        const query = "DELETE FROM channel_doccuments WHERE id = ?";
        await sqlConnection.promise().query(query, [documentId]);
        res.status(200).json({ message: "Document deleted successfully" });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function deleteChannelEvent(req, res) {
    try {
        const { eventId } = req.body;
        const query = "DELETE FROM calendar_events WHERE id = ?";
        await sqlConnection.promise().query(query, [eventId]);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

async function removeChannelMember(req, res) {
    try {
        const { channelId, memberId } = req.body;
        const query = "DELETE FROM userstochannels WHERE channelid = ? AND userid = ?";
        await sqlConnection.promise().query(query, [channelId, memberId]);
        res.status(200).json({ message: "Member removed successfully" });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

module.exports = {
    deleteAnnouncement,
    deleteAssignment,
    deleteChannelDocument,
    deleteChannelEvent,
    removeChannelMember
};
