/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/24
 */
export default (sequelize, DataTypes) => sequelize.define('TradeUnionActActors', {
  id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true},
  act_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},
  user_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},
}, {
  classMethods: {
    associate(models) {

      this.belongsTo(models.TradeUnionAct, {
        as: 'activity',
        foreignKey: 'act_id',
        sourceKey: 'id',
      });

      this.belongsTo(models.User, {
        as: 'actor_info',
        foreignKey: 'user_id',
        sourceKey: 'id',
      });

    }
  }
})