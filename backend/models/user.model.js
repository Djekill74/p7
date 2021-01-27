module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    usename: {
      type: Sequelize.STRING(16)
    },
    email: {
      type: Sequelize.STRING(255)
    },
    password: {
      type: Sequelize.STRING(255)
    },
    role: {
      type: Sequelize.STRING(45)
    },
    updatedAt: {
      type: Sequelize.DATE(6)
    }
  }, {
    classMethods: {
      associate: function (models) {
        models.User.hasmany(models.Forum)
      }
    }
  }
  );

  return User;
};