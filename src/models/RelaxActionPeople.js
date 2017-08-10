/**
 * Created by alixez on 17-8-10.
 */

// 疗养休人员表
export default function (sequelize, DataTypes) {
  return sequelize.define('RelaxActionPeople', {
    id: {type: DataTypes.UUID, primaryKey: true}, // 评价人ID
    relax_action_id: {type: DataTypes.UUID}, // 关联疗养休信息表ID
    person_category: {type: DataTypes.INTEGER}, // 人员类别 0:机务人员 1:有毒有害工作人员 2:康复人员 3:先进人员 4:献血人员 5:管理人员技术人员 6:职工 7:劳务工
    people_number: {type: DataTypes.INTEGER}, // 人数
  }, {
    associate(models) {
      this.belongsTo(models.RelaxAction, {
        foreignKey: 'relax_action_id',
        sourceKey: 'id',
      })
    }
  });
}