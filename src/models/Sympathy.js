
export default function (sequelize, DataTypes) {
  return sequelize.define('Sympathy', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    reason: {type: DataTypes.STRING},  // 慰问事由
    dept_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},   // 发起部门
    user_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},   // 发起人
    person: {type: DataTypes.STRING},  // 被慰问人
    sympathy_date: {type: DataTypes.STRING}, // 慰问时间
    sympathy_cost: {type: DataTypes.DECIMAL(10, 2)}, // 慰问金额
    sympathy_good_cost: {type: DataTypes.DECIMAL(10, 2)}, // 慰问品金额
    sympathy_type: {type: DataTypes.INTEGER}, // 0：未知 1:困难 2:生病 3:一线员工
    person_num: {type: DataTypes.INTEGER}, // 慰问人数
    state: {type: DataTypes.INTEGER}, // 0:草稿 1:待审批 2:已通过 3:未通过
    apply_time: {type: DataTypes.STRING}, // 发起时间
    note: {type: DataTypes.STRING}, // 备注说明
  }, {
    classMethods: {
      associate(models) {

        this.belongsTo(models.Dept, {
          as: 'department',
          foreignKey: 'dept_id',
          targetKey: 'id',
        });

        this.belongsTo(models.User, {
          as: 'publisher',
          foreignKey: 'user_id',
          targetKey: 'id',
        });
      }
    }
  });
}