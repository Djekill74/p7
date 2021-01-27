module.exports = (sequelize, Sequelize) => {
    const Forum = sequelize.define("forum", {
      title: {
        type: Sequelize.STRING(45)
      },
      texte: {
        type: Sequelize.TEXT('medium')
      },
      idUsers: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model:'users',
            key: 'id'
        }
    }

    });
  
    return Forum;
  };