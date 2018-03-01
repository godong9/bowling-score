const models = require("../models");

const Score = models.Score;

const commonOptions = {
  include: [
    {
      association: "user",
    },
  ],
};

function getScores(params) {
  const modelParams = Object.assign({}, params, commonOptions);
  return Score.findAll(modelParams);
}

function getScoresByUserId(userId) {
  const modelParams = Object.assign({}, commonOptions);
  modelParams.include[0].where = { id: userId, };
  return Score.findAll(modelParams);
}

function getScore(id) {
  const options = Object.assign({}, commonOptions);
  return Score.findById(id, options);
}

function saveScore(params) {
  const modelParams = Object.assign({}, params);
  return Score.create(modelParams);
}

function deleteScore(userId, targetDate) {
  return Score.destroy({
    where: {
      userId: userId,
      targetDate: targetDate,
    },
  });
}

function deleteAll() {
  return Score.destroy({ truncate: true, });
}


module.exports = {
  getScores: getScores,
  getScoresByUserId: getScoresByUserId,
  getScore: getScore,
  saveScore: saveScore,
  deleteScore: deleteScore,
  deleteAll: deleteAll,
};
