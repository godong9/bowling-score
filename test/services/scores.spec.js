const expect = require("chai").expect;
const rewire = require("rewire");

const UserService = require("../../app/services/users");
const ScoreService = rewire("../../app/services/scores");

describe("ScoreService", () => {
  describe("#getScores", () => {
    before((done) => {
      // given
      ScoreService.deleteAll()
        .then(() => UserService.deleteAll())
        .then(() => UserService.saveUser({ nickname: "test", email: "test@test.com", }))
        .then((user) => ScoreService.saveScore({ score: 100, targetDate: "2018-02-28", userId: user.id, }))
        .then(() => {
          done();
        });
    });

    it("should get scores", (done) => {
      // when
      ScoreService.getScores()
        .then(scores => {
          // then
          expect(scores.length).to.equal(1);
          expect(scores[0].score).to.equal(100);
          expect(scores[0].targetDate).to.equal("2018-02-28");
          expect(scores[0].user.nickname).to.equal("test");
          expect(scores[0].user.email).to.equal("test@test.com");
          done();
        })
        .catch(e => done(e));
    });
  });
});
