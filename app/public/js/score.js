import "../css/common.css";
import "../css/score.css";
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

  $(".buttonDelete").click(function() {
    const userId = $("#inputUserId").val();
    const targetDate = $(this).parent().data("date");
    HttpUtil.deleteData(`/scores/user/${userId}/date/${targetDate}`, {}, function(err, data) {
      if (data && data.status === "SUCCESS") {
        location.reload();
      }
    });
  });
};

export default new Score();
