import "../css/common.css";
import "../css/game.css";

const inputPattern = /[^0-9,\/]/gi;

const $inputFirstTeam = $("#inputFirstTeam");
const $inputFirstTeamBonus = $("#inputFirstTeamBonus");
const $firstTeamResult = $("#firstTeamTotal");

const $inputSecondTeam = $("#inputSecondTeam");
const $inputSecondTeamBonus = $("#inputSecondTeamBonus");
const $secondTeamResult = $("#secondTeamTotal");

function Game() {
  this.init();
}

Game.prototype.init = function() {
  this.bind();
};

Game.prototype.bind = function() {
  const self = this;
  $inputFirstTeam.keyup(function() {
    self.calFirstTeamScore();
  });

  $inputFirstTeamBonus.keyup(function() {
    self.calFirstTeamScore();
  });

  $inputSecondTeam.keyup(function() {
    self.calSecondTeamScore();
  });

  $inputSecondTeamBonus.keyup(function() {
    self.calSecondTeamScore();
  });
};

Game.prototype.calFirstTeamScore = function() {
  const firstTeamInput = $inputFirstTeam.val();
  const firstTeamScoreList = firstTeamInput.split(/\/|,/);
  const firstTeamBonus = parseInt($inputFirstTeamBonus.val());

  $firstTeamResult.text(
    _.sumBy(firstTeamScoreList, score => parseInt(score)) + firstTeamBonus
  );
};

Game.prototype.calSecondTeamScore = function() {
  const secondTeamInput = $inputSecondTeam.val();
  const secondTeamScoreList = secondTeamInput.split(/\/|,/);
  const secondTeamBonus = parseInt($inputSecondTeamBonus.val());

  $secondTeamResult.text(
    _.sumBy(secondTeamScoreList, score => parseInt(score)) + secondTeamBonus
  );
};

export default new Game();
