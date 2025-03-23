const express = require("express");
const homeRouter = express.Router();

const sqlDeleteController = require("../controller/sqlDeleteController");
const sqlGetController = require("../controller/sqlGetController");
const sqlPostController = require("../controller/sqlPostController");
const sqlUpdateController = require("../controller/sqlUpdateController");

homeRouter.post("/login", sqlGetController.login);
homeRouter.post("/getAllUsers", sqlGetController.getAllUsers);
homeRouter.post("/signup", sqlPostController.signup);
homeRouter.post("/getUserChannels", sqlGetController.getUserChannels);
homeRouter.post("/createChannel", sqlPostController.createChannel);
homeRouter.post("/joinChannel", sqlPostController.joinChannel);
homeRouter.post("/getChannelById", sqlGetController.getChannelById);
homeRouter.post("/getChannelAnnouncements", sqlGetController.getChannelAnnouncements);
homeRouter.post("/getChannelAssignments", sqlGetController.getChannelAssignments);
homeRouter.post("/getChannelMarks", sqlGetController.getChannelMarks);
homeRouter.post("/createAnnouncement", sqlPostController.createAnnouncement);
homeRouter.post("/createAssignment", sqlPostController.createAssignment);
homeRouter.post("/getChannelMembers", sqlGetController.getChannelMembers);
homeRouter.post("/updateUserRole", sqlPostController.updateUserRole);
homeRouter.post("/removeMember", sqlPostController.removeMember);
homeRouter.post("/createChat", sqlPostController.createChat);
homeRouter.post("/getChats", sqlPostController.getChats);
homeRouter.post("/resetUserPassword", sqlPostController.resetUserPassword);
homeRouter.post("/updateUserEmail", sqlPostController.updateUserEmail);
homeRouter.post("/updateProfilePicture", sqlPostController.updateProfilePicture);

homeRouter.post("/addFriend", sqlPostController.addFriend);
homeRouter.post("/getFriends", sqlPostController.getFriends);
homeRouter.post("/deleteFriend", sqlPostController.deleteFriend);
homeRouter.post("/getUserById", sqlGetController.getUserById);

module.exports = homeRouter;