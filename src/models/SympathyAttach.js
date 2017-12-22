/**
 * Created by alixez on 17-7-26.
 */

import {generateNo} from '../utils/utils';

// 活动附件(活动、慰问)
export default function (sequelize, DataTypes) {
  return sequelize.define('SympathyAttach', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    sympathy_id: {type: DataTypes.UUID},
    no: {type: DataTypes.STRING, defaultValue: generateNo},
    file_path: {type: DataTypes.STRING, length: 255},
    size: {type: DataTypes.INTEGER},
    origin_filename: {type: DataTypes.STRING},
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Sympathy, {
          as: 'sympathy_attach',
          foreignKey: 'sympathy_id',
          targetKey: 'id',
          onDelete: 'cascade',
        });
      },
    }
  });
}