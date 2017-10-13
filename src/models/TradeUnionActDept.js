/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/30
 */

export default (sequelize, DataTypes) => sequelize.define('TradeUnionActDept', {
  id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true},
  act_id: {type: DataTypes.UUID},
  dept_id: {type: DataTypes.UUID},
}, {
  classMethods: {
    associate(models) {
      this.belongsTo(models.TradeUnionAct, {
        as: 'activity',
        foreignKey: 'act_id',
        sourceKey: 'id',
      });

      this.belongsTo(models.Dept, {
        as: 'dept_info',
        foreignKey: 'dept_id',
        sourceKey: 'id',
      });
    }
  }
});