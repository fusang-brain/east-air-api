/**
 * Created by alixez on 17-7-26.
 */
// 经费申请信息表
export default function (sequelize, DataTypes) {
  return sequelize.define('GrantApplication', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    type: {type: DataTypes.INTEGER}, // 1:慰问困难、生病员工 2:慰问一线员工 3:文体活动 4:疗养休费 5:培训费 6:会务费 7:固定资产 8:其他 0: 未知
    type_string: {type: DataTypes.STRING},
    dept_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},
    user_id: {type: DataTypes.UUID},
    cost: {type: DataTypes.DECIMAL(10,2)},
    purpose: {type: DataTypes.TEXT},
    people_count: {type: DataTypes.INTEGER},
    others: {type: DataTypes.TEXT},
    state: {type: DataTypes.INTEGER, defaultValue: 4}, // 0:草稿 1:待审批 2:已通过 3:未通过 4:未知
    apply_time: {type: DataTypes.STRING, defaultValue: Date.now}, // 发起时间
    is_act: {type: DataTypes.BOOLEAN, defaultValue: false}, // 是否属于活动
  }, {
    classMethods: {
      associate(models) {
        this.hasMany(models.GrantItem, {
          as: 'items',
          foreignKey: 'grant_apply_id',
          sourceKey: 'id',
        });
        this.hasMany(models.GrantAttach, {
          as: 'attach',
          foreignKey: 'grant_application_id',
          sourceKey: 'id',
        });
        this.belongsTo(models.Dept, {
          as: 'dept',
          foreignKey: 'dept_id',
          sourceKey: 'id',
          onDelete: 'cascade',
        });
        this.belongsTo(models.User, {
          as: 'publisher',
          foreignKey: 'user_id',
          sourceKey: 'id',
          onDelete: 'cascade',
        })
      }
    }
  })
}