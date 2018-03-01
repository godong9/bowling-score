
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define("Score", {
    id: {
      type: DataTypes.BIGINT,
      field: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      field: "userId",
    },
    score: {
      type: DataTypes.INTEGER,
      field: "score",
    },
    targetDate: {
      type: DataTypes.DATE,
      field: "targetDate",
    },
  }, {
    tableName: "scores",
    timestamps: true,
  });

  Score.associate = (models) => {
    Score.belongsTo(models.User, {
      as: "user",
    });
  };

  return Score;
};
