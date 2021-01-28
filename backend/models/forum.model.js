module.exports = (sequelize, Sequelize) => {
    const Forum = sequelize.define("forum", {
      title: {
        type: Sequelize.STRING(45)
      },
      texte: {
        type: Sequelize.TEXT('medium')
      },

    });
  
    return Forum;
  };