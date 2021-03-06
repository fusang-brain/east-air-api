/**
 * Created by alixez on 17-7-28.
 */

import {generateNo} from '../utils/utils';
export default function (sequelize, DataTypes) {
  return sequelize.define('TradeUnionActImage', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    act_id: {type: DataTypes.UUID},
    no: {type: DataTypes.STRING, defaultValue: generateNo},
    file_path: {type: DataTypes.STRING, length: 255},
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.TradeUnionAct, {
          as: 'trade_union_act',
          foreignKey: 'act_id',
          targetKey: 'id',
          onDelete: 'cascade',
        });
      },
    }
  });
}