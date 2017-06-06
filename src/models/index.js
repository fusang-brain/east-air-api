/**
 * Created by alixez on 17-6-6.
 */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const db = {};
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'sequelize.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config.sequelize);

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