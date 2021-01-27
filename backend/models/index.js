const dbConfig = require("../config/db.config.js");

const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.forum = require("./forum.model")(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);
db.response = require('./response.model')(sequelize, Sequelize);

//db.forum.hasMany(db.response, {as: 'responsesSubject'});
//db.response.belongsTo(db.forum, {
//  foreignKey: 'id', as: 'responseSubject'
//})

//db.user.hasMany(db.forum, {as: 'subject'})
//db.forum.belongsTo(db.user, {
//  foreignKey: 'id', as:'subject'
//})

//db.user.hasMany(db.response, {as: 'responsesUser'})
//db.response.belongsTo(db.user, {
//  foreignKey: 'id', as: 'responseUser'
//})






module.exports = db;