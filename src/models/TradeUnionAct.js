/**
 * Created by alixez on 17-7-26.
 */
import {generateNo} from '../utils/utils';
// 工会活动信息表
export default function (sequelize, DataTypes) {
  return sequelize.define('TradeUnionAct', {
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true},
    no: {type: DataTypes.STRING, defaultValue: generateNo},
    act_type: {type: DataTypes.INTEGER},              // 活动分类 0: 职工教育 1:文体活动 2:宣传活动 3:其他活动 4:送温暖 5:培训 6:会议 7:专项会议 8:其他业务
    subject: {type: DataTypes.STRING, length: 200},   // 活动主题
    purpose: {type: DataTypes.TEXT},                  // 活动目的
    target: {type: DataTypes.STRING, length: 100},    // 活动对象
    address: {type: DataTypes.STRING, length: 255},   // 活动地点
    start_date: {type: DataTypes.STRING, length: 14}, // 开始日期
    end_date: {type: DataTypes.STRING, length: 14},   // 结束日期
    process: {type: DataTypes.TEXT},                  // 活动流程
    budget_total: {type: DataTypes.DECIMAL(10, 2)},   // 预算总额
    integration: {type: DataTypes.INTEGER},           // 奖励积分
    state: {type: DataTypes.INTEGER},                 // 状态 0:草稿 1:待审批 2:已通过 3:未通过
    dept_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},                  // 发起工会
    user_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},                  // 发布人ID
    grant_apply_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},           // 经费审批ID
    create_date: {type: DataTypes.STRING, defaultValue: Date.now}, //创建时间
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false}, // 是否删除
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Dept, {
          as: 'department',
          foreignKey: 'dept_id',
          targetKey: 'id',
          onDelete: 'cascade',
        });

        this.belongsTo(models.User, {
          as: 'publisher',
          foreignKey: 'user_id',
          targetKey: 'id',
          onDelete: 'cascade',
        });

        this.belongsTo(models.GrantApplication, {
          as: 'grant_apply',
          foreignKey: 'grant_apply_id',
          targetKey: 'id',
          onDelete: 'cascade',
        });

        this.hasMany(models.TradeUnionActAttach, {
          as: 'attach',
          foreignKey: 'act_id',
          sourceKey: 'id',
        });

        this.hasMany(models.TradeUnionActImage, {
          as: 'images',
          foreignKey: 'act_id',
          sourceKey: 'id',
        });

        this.hasMany(models.TradeUnionActBudget, {
          as: 'budgets',
          foreignKey: 'act_id',
          sourceKey: 'id',
        });

        this.hasMany(models.ActEvaluation, {
          as: 'evaluations',
          foreignKey: 'act_id',
          sourceKey: 'id',
        });

        this.hasMany(models.TradeUnionActActors, {
          as: 'actors',
          foreignKey: 'act_id',
          sourceKey: 'id',
        });

        this.hasMany(models.TradeUnionActDept, {
          as: 'accept_depts',
          foreignKey: 'act_id',
          sourceKey: 'id',
        });

      }
    }
  })
}