/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */

import {generateNo} from '../utils/utils';

// 经费附件
export default function (sequelize, DataTypes) {
  return sequelize.define('GrantAttach', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    grant_application_id: {type: DataTypes.UUID},
    no: {type: DataTypes.STRING, defaultValue: generateNo},
    file_path: {type: DataTypes.STRING, length: 255},
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.GrantApplication, {
          as: 'grant_application',
          foreignKey: 'grant_application_id',
          targetKey: 'id',
        });
      },
    }
  });
}