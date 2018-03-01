const express = require("express");
const _ = require("lodash");
const Promise = require("bluebird");
const { check, validationResult } = require("express-validator/check");

const UserService = require("../services/users");
const ScoreService = require("../services/scores");
const ErrorFormatter = require("../helpers/errorFormatter");
const logger = require("../helpers/logger");
const AjaxResponse = require("../helpers/ajaxResponse");

const router = express.Router();

/**
 * @api {post} /scores Save score
 * @apiName SaveScore
 * @apiGroup Score
 *
 * @apiSuccess {String} nickname 유저 닉네임
 * @apiSuccess {String} targetDate 날짜
 * @apiSuccess {String} score 점수
 */
router.post("/", [
  check("targetDate").isLength({ min: 10 }).withMessage("잘못된 날짜입니다."),
  check("nickname").isLength({ min: 2 }).withMessage("잘못된 이름입니다."),
  check("score").isLength({ min: 1 }).withMessage("잘못된 점수입니다.")
], (req, res, next) => {
  const errors = validationResult(req).formatWith(ErrorFormatter);
  if (!errors.isEmpty()) {
    logger.debug(errors.mapped());
    res.send(AjaxResponse.error(errors.array()));
    return;
  }
  req.body.score = req.body.score.replace(/[^0-9,]/gi, "");

  UserService.getUserByNickname(req.body.nickname)
    .then(user => {
      if (!user || !user.id) {
        return res.send(AjaxResponse.error("존재하지 않는 유저입니다."));
      }

      const promiseList = _.map(req.body.score.split(","), score => {
        if (parseInt(score) > 300) {
          return Promise.reject("잘못된 점수가 포함되어 있습니다.");
        }
        ScoreService.saveScore({
          userId: user.id,
          targetDate: req.body.targetDate,
          score: score,
        });
      });

      Promise.all(promiseList).then(() => {
        res.send(AjaxResponse.success());
      }).catch(e => res.send(AjaxResponse.error(e)));
    })
    .catch(e => res.send(AjaxResponse.error(e)));
});

module.exports = router;
