const express = require("express");
const homeRouter = express.Router();

const sqlDeleteController = require("../controller/sqlDeleteController");
const sqlGetController = require("../controller/sqlGetController");
const sqlPostController = require("../controller/sqlPostController");
const sqlUpdateController = require("../controller/sqlUpdateController");

homeRouter.post("/login", sqlGetController.login);
homeRouter.post("/getAllUsers", sqlGetController.getAllUsers);

module.exports = homeRouter;