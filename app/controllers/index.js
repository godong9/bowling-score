const express = require("express");
const moment = require("moment");
const _ = require("lodash");

const UserController = require("./users");
const FileController = require("./files");
const ScoreController = require("./scores");
const UserService = require("../services/users");
const ScoreService = require("../services/scores");

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
router.get("/score/:nickname", (req, res, next) => {
  const nickname = req.params.nickname;
  UserService.getUserByNickname(nickname)
    .then(user => {
      if (!user) {
        return next("Not exist user");
      }
      return ScoreService.getScoresByUserId(user.id);
    })
    .then(scoreList => {
      const groupedScoreList = _.chain(scoreList)
        .groupBy("targetDate")
        .orderBy(["targetDate", "createdAt"], ['desc', 'desc'])
        .map(score => {
          return {
            targetDate: score.targetDate,
            score: score.score,
          }
        })
        .value();

      console.log(groupedScoreList);
      res.render("score", {
        nickname: req.params.nickname,
        scoreList: groupedScoreList,
        today: moment().format("YYYY-MM-DD"),
      });
    })
    .catch(e => next(e));
});

module.exports = router;
