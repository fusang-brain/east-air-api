/**
 * Created by alixez on 17-6-6.
 */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const db = {};
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'sequelize.json'));
const DBConfig = config[env];

function log(...message) {
  if (process.env.NODE_ACTION === 'install') return;
  if (env === 'development') {
    console.log(message);
  }
  return true;
}

config.options.logging = log;
const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, config.options);

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