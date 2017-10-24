/**
 * Created by alixez on 17-8-10.
 */
import {generateNo} from '../utils/utils';
// 疗养秀信息表
export default function (sequelize, DataTypes) {
  return sequelize.define('RelaxAction', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    no: {type: DataTypes.STRING, defaultValue: generateNo},
    dept_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},
    user_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},
    title: {type: DataTypes.STRING}, // 主题
    action_type: {type: DataTypes.INTEGER},  // 组织形式 （0-未知 1-自行 2-委托）
    per_capita_budget: {type: DataTypes.DECIMAL(10,2)}, // 人均预算
    people_number: {type: DataTypes.INTEGER}, // 人数
    total: {type: DataTypes.DECIMAL(10,2)}, // 合计
    days: {type: DataTypes.INTEGER}, // 疗休养天数
    date: {type: DataTypes.STRING}, // 疗休养时间 开始时间
    place: {type: DataTypes.STRING}, // 疗休养地点
    state: {type: DataTypes.INTEGER}, // 0:草稿 1:已提交(待处理)
    apply_time: {type: DataTypes.STRING}, // 申请时间
  }, {
    classMethods: {
      associate(models) {
        this.hasMany(models.RelaxActionPeople, {
          foreignKey: 'relax_action_id',
          sourceKey: 'id',
          as: 'people',
        });
        this.belongsTo(models.Dept, {
          foreignKey: 'dept_id',
          sourceKey: 'id',
          as: 'department',
        });
        this.belongsTo(models.User, {
          foreignKey: 'user_id',
          sourceKey: 'id',
          as: 'publisher',
        });
      }
    }
  });
}