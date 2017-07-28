/**
 * Created by alixez on 17-7-26.
 */
// 活动附件
export default function (sequelize, DataTypes) {
  return sequelize.define('TradeUnionActAttach', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    act_id: {type: DataTypes.UUID},
    no: {type: DataTypes.INTEGER},
    file_path: {type: DataTypes.STRING, length: 255},
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.TradeUnionAct, {
          as: 'trade_union_act',
          foreignKey: 'act_id',
          targetKey: 'id',
        });
      },
    }
  });
}