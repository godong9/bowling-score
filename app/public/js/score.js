import "../css/common.css";
import HttpUtil from "./httpUtil";

function Score() {
  this.init();
}

Score.prototype.init = function() {
  this.bind();
};

Score.prototype.bind = function() {
  $("#buttonSave").click(function() {
    const targetDate = $("#inputDate").val();
    const score = $("#inputScore").val();
    const nickname = $("#inputNickname").val();

    HttpUtil.postData("/scores", {
      targetDate: targetDate,
      score: score,
      nickname: nickname
    }, function(err, data) {
      if (data && data.status === "SUCCESS") {
        location.reload();
      }
    });
  });
};

export default new Score();
