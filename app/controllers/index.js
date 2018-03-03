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

/* GET game page */
router.get("/game", (req, res) => {
  res.render("game");
});

/* GET score page */
router.get("/score/:nickname", (req, res, next) => {
  const nickname = req.params.nickname;
  let userId = null;
  UserService.getUserByNickname(nickname)
    .then(user => {
      if (!user) {
        return next("Not exist user");
      }
      userId = user.id;
      return ScoreService.getScoresByUserId(userId);
    })
    .then(scoreListRow => {
      const scoreList = _.map(scoreListRow, scoreRow => {
        return scoreRow.dataValues;
      });

      let lowScore = 0;
      let highScore = 0;
      try {
        lowScore = _.minBy(scoreList, "score").score;
        highScore = _.maxBy(scoreList, "score").score;
      } catch(e) {
        lowScore = 0;
        highScore = 0;
      }

      const avgScore = _.meanBy(scoreList, "score").toFixed(1);
      const latestAvgScore = _.chain(scoreList)
        .orderBy(["targetDate", "createdAt"], ['desc', 'desc'])
        .take(10)
        .meanBy("score")
        .value().toFixed(1);

      const groupedScoreList = _.chain(scoreList)
        .orderBy(["targetDate", "createdAt"], ['desc', 'desc'])
        .groupBy("targetDate")
        .map(scoreList => {
          return {
            targetDate: scoreList[0].targetDate,
            scoreList: scoreList,
          }
        })
        .value();

      res.render("score", {
        userId: userId,
        nickname: req.params.nickname,
        scoreList: groupedScoreList,
        avgScore: avgScore || 0,
        latestAvgScore: latestAvgScore || 0,
        lowScore: lowScore || 0,
        highScore: highScore || 0,
        today: moment().format("YYYY-MM-DD"),
      });
    })
    .catch(e => next(e));
});

module.exports = router;
