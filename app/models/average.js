
module.exports = (sequelize, DataTypes) => {
  const Average = sequelize.define("Average", {
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
      field: "latestAverage",
    },
    targetDate: {
      type: DataTypes.DATE,
      field: "totalAverage",
    },
  }, {
    tableName: "averages",
    timestamps: true,
  });

  Average.associate = (models) => {
    Average.belongsTo(models.User, {
      as: "user",
    });
  };

  return Average;
};
