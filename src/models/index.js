/**
 * Created by alixez on 17-6-6.
 */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const db = {};
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'sequelize.json'))[env];
const apiConfig = require('../config/api');
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    charset: "utf8",
    collate: "utf8_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  define: {
    underscored: false,
    timestamps: false,
    deletedAt: false,
    paranoid: true
  }
});

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;