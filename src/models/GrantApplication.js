/**
 * Created by alixez on 17-7-26.
 */
// 经费申请信息表
export default function (sequelize, DataTypes) {
  return sequelize.define('GrantApplication', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    type: {type: DataTypes.INTEGER}, // 1:慰问困难、生病员工 2:慰问一线员工 3:文体活动 4:疗养休费 5:培训费 6:会务费 7:固定资产 8:其他
    dept_id: {type: DataTypes.UUID},
    cost: {type: DataTypes.DECIMAL(10,2)},
    purpose: {type: DataTypes.TEXT},
    people_count: {type: DataTypes.INTEGER},
    others: {type: DataTypes.TEXT},
  })
}