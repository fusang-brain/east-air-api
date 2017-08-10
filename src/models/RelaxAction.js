/**
 * Created by alixez on 17-8-10.
 */

// 疗养秀信息表
export default function (sequelize, DataTypes) {
  return sequelize.define('RelaxAction', {
    id: {type: DataTypes.UUID, primaryKey: true}, // 评价人ID
    title: {type: DataTypes.STRING}, // 主题
    action_type: {type: DataTypes.INTEGER},  // 组织形式 （1-自行 2-委托）
    per_capita_budget: {type: DataTypes.DECIMAL(10,2)}, // 人均预算
    people_number: {type: DataTypes.INTEGER}, // 人数
    total: {type: DataTypes.DECIMAL(10,2)}, // 合计
    days: {type: DataTypes.INTEGER}, // 疗休养天数
    date: {type: DataTypes.STRING}, // 疗休养时间
    place: {type: DataTypes.STRING}, // 疗休养地点
    state: {type: DataTypes.INTEGER}, // 0: 待审批 1:草稿 2:已通过 3:未通过
    apply_date: {type: DataTypes.STRING}, // 申请时间
  }, {
    associate(models) {
      this.hasMany(models.RelaxActionPeople, {
        foreignKey: 'relax_action_id',
        sourceKey: 'id',
        as: 'people',
      });
    }
  });
}