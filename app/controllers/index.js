const express = require("express");
const moment = require("moment");

const UserController = require("./users");
const FileController = require("./files");
const ScoreController = require("./scores");

const router = express.Router();

// users API controller
router.use("/users", UserController);

// file API controller
router.use("/files", FileController);

// score API controller
router.use("/scores", ScoreController);

/* GET index page */
router.get("/", (req, res) => {
  res.render("index");
});

/* GET score page */
router.get("/score", (req, res) => {
  res.render("score", {today: moment().format("YYYY-MM-DD")});
});

module.exports = router;
