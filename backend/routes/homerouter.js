const express = require("express");
const homeRouter = express.Router();

// Define your routes here
homeRouter.get("/", (req, res) => {
    res.send("Welcome to the home route!");
});

module.exports = homeRouter;