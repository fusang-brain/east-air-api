/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/16
 */

// 公文表
export default function (sequelize, DataTypes) {
  return sequelize.define('Docs', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    receiver_type: {type: DataTypes.STRING}
  });
}