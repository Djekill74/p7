module.exports = (sequelize, Sequelize) => {
  const Response = sequelize.define("response", {
    texte: {
      type: Sequelize.TEXT('medium')
    },
    updatedAt: {
      type: Sequelize.DATE(6)
    }
  });

  return Response;
};