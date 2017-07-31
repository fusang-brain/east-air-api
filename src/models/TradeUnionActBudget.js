/**
 * Created by alixez on 17-7-26.
 */
// 活动预算
export default function (sequelize, DataTypes) {
  return sequelize.define('TradeUnionActBudget', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    act_id: {type: DataTypes.UUID},
    project: {type: DataTypes.STRING, length: 255},
    cost: {type: DataTypes.DECIMAL(10, 2)},
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.TradeUnionAct, {
          as: 'trade_union_act',
          foreignKey: 'act_id',
          targetKey: 'id',
        });
      }
    }
  });
}