const models = require("../models");

const User = models.User;

function getUsers(params) {
  const modelParams = Object.assign({}, params);
  return User.findAll(modelParams);
}

function getUser(id) {
  return User.findById(id);
}

function getUserByNickname(nickname) {
  return User.findOne({ where: { nickname: nickname, } });
}

function saveUser(params) {
  const modelParams = Object.assign({}, params);
  return User.create(modelParams);
}

function deleteAll() {
  return User.destroy({ truncate: true, });
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  getUserByNickname: getUserByNickname,
  saveUser: saveUser,
  deleteAll: deleteAll,
};
