module.exports = (sequelize, Sequelize) => {
    const Response = sequelize.define("response", {
      texte: {
        type: Sequelize.TEXT('medium')
      },
      updatedAt: {
        type: Sequelize.DATE(6)
      },
      idUsers: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model:'users',
            key: 'id'
        }
      },
      idForums: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'forums',
          key:'id'
        }
      }
    });
  
    return Response;
  };