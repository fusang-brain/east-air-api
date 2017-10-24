/**
 * Created by alixez on 17-8-2.
 */

// 经费申请信息表
export default function (sequelize, DataTypes) {
  return sequelize.define('GrantItem', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    grant_apply_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.DECIMAL(10,2)},
    count: {type: DataTypes.INTEGER},
    total: {type: DataTypes.DECIMAL(10, 2)},
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.GrantApplication, {
          as: 'grant_apply',
          foreignKey: 'grant_apply_id',
          sourceKey: 'id',
        })
      }
    },
  })
}