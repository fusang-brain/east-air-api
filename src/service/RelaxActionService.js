/**
 * Created by alixez on 17-8-10.
 */

import Service from './Service';
import Decimal from 'decimal.js';
import moment from 'moment';
import Response from '../config/response';

export default class RelaxActionService extends Service {
  constructor() {
    super();
    this.modelName = 'RelaxAction';
    this.RelaxAction = this.getModel();
    this.RelaxActionPeople = this.getModel('RelaxActionPeople');
  }

  async create(args) {
    const RelaxAction = this.getModel();
    const RelaxActionPeople = this.getModel('RelaxActionPeople');
    args.per_capita_budget = new Decimal(args.per_capita_budget).toNumber();
    let peopleNumber = 0;
    if (args.people.length <= 0) {
      throw {
        code: Response.getErrorCode('create'),
        message: '请完善疗休养的人员信息',
      }
    }

    let people = args.people;
    for (let i = 0; i < people.length; i ++) {
      let item = people[i];
      peopleNumber = peopleNumber + parseInt(item.people_number);
    }
    !args.people_number && (args.people_number = peopleNumber);
    const dailyTotal = Decimal.mul(args.per_capita_budget, args.people_number).toNumber();
    // args.total = Decimal.mul(dailyTotal, args.days).toNumber();
    args.total = dailyTotal;
    args.apply_time = Date.now();
    return await RelaxAction.create(args, {
      include: [
        {
          model: RelaxActionPeople,
          as: 'people'
        }
      ]
    });

  }

  async remove(id, userID) {
    const Approval = this.getModel('Approval');
    const ApprovalFlows = this.getModel('ApprovalFlows');
    const relaxAction = await this.RelaxAction.findOne({
      where:{
        id,
      }
    });
    if (!relaxAction) {
      return;
    }
    // if (relaxAction.state !== 0) {
    //   throw {
    //     code: Response.getErrorCode(),
    //     message: '只有草稿可以删除!',
    //   }
    // }

    if (relaxAction.user_id !== userID) {
      throw {
        code: Response.getErrorCode('remove'),
        data: {},
        message: '该活动不是由您发起的，无法删除'
      }
    }

    const foundApproval = await Approval.findOne({where: {project_id: id}});
    // 判断活动是否在审批流程中
    if (foundApproval) {
      const count = await ApprovalFlows.count({ where: { approval_id: foundApproval.id, result: { $in: [1, 2] } }});
      if (count > 0) {
        throw {
          code: Response.getErrorCode('remove'),
          data: {},
          message: '该活动已经审批无法删除',
        }
      }
    }

    await this.RelaxAction.destroy({
      where: {
        id: id,
      }
    });
    await this.RelaxActionPeople.destroy({
      where: {
        relax_action_id: id,
      }
    });


  }

  async update(args) {
    const {id, people, ...params} = args;
    const relaxAction = await this.RelaxAction.findOne({
      where:{
        id,
      }
    });
    if (!relaxAction) {
      return;
    }
    if (relaxAction.state !== 0) {
      throw {
        code: Response.getErrorCode(),
        message: '只有草稿可以修改!',
      }
    }
    if (args.per_capita_budget) {
      params.per_capita_budget = new Decimal(args.per_capita_budget).toNumber();
    }
    if (people) {
      let peopleNumber = 0;
      let peopleArgs = [];
      for (let i = 0; i < people.length; i ++) {
        let item = people[i];
        peopleArgs.push({
          relax_action_id: id,
          person_category: item.person_category,
          people_number: item.people_number,
        });
        peopleNumber = peopleNumber + parseInt(item.people_number);
      }
      params.people_number = peopleNumber;
      let perCapitaBudget = params.per_capita_budget || relaxAction.per_capita_budget;
      const dailyTotal = Decimal.mul(perCapitaBudget, params.people_number).toNumber();
      params.total = Decimal.mul(dailyTotal, args.days).toNumber();
      // params.total = Decimal.mul(perCapitaBudget, params.people_number).toNumber();
      await this.RelaxActionPeople.destroy({where: {relax_action_id: id}});
      await this.RelaxActionPeople.bulkCreate(peopleArgs);
    }

    await this.RelaxAction.update(params, {
      where: {
        id: id,
      }
    });

    return true;
  }

  async generateList({subject, status, offset, limit}) {
    let condition = {
      dept_id: {
        $in: this.dataAccess,
      }
    };
    if (subject) {
      condition.title = {
        $like: `%${subject}%`,
      }
    }
    if (!['all', 'draft', 'has_submit'].includes(status)) {
      throw {
        code: Response.getErrorCode(),
        message: '不支持的筛选类型',
      }
    }
    if (status === 'all') {
      condition.state = {
        $in: [0, 1],
      }
    }
    if (status === 'draft') {
      condition.state = 0;
    }
    if (status === 'has_submit') {
      condition.state = 1;
    }

    const list =  await this.RelaxAction
      .all({
        where: condition,
        attributes: ['id', 'no', 'title', 'action_type', 'apply_time', 'state', 'total', 'days', 'people_number', 'date'],
        offset,
        limit,
        include: [
          {
            model: this.getModel('Dept'),
            as: 'department',
          },
        ],
        order: [
          ['apply_time', 'DESC'],
        ],
      });

    const total = await this.RelaxAction.count({
      where: condition,
    });

    return {
      list, total,
    }

  }

  async details(id) {

    const res = await this.RelaxAction.findOne({
      where: {
        id: id,
      },
      order: [
        [{model: this.RelaxActionPeople, as:'people'}, 'person_category', 'ASC'],
      ],
      include: [
        {
          model: this.RelaxActionPeople,
          as: 'people',
        },
        {
          model: this.getModel('Dept'),
          as: 'department',
        },
        {
          model: this.getModel('User'),
          as: 'publisher',
        }
      ]
    });

    if (!res) {
      throw {
        code: Response.getErrorCode(),
        message: '没有该数据',
      }
    }

    const endTime = moment(+res.date).add('day', +res.days);
    if (res.state !== 0 && endTime.toDate().getTime() < Date.now()) {
      res.state = 2;
    }
    res.setDataValue('end_time', endTime.toDate().getTime());

    return res;
  }

  async statisticsResultTotal(duration) {
    const dataAccessStr = this.dataAccess.join("','");
    const conditionArr = [];
    let condition = `WHERE `;
    conditionArr.push(`ra.dept_id IN ('${dataAccessStr}')`)
    if (duration && duration.start) {
      conditionArr.push(`ra.date >= ${duration.start}`);
    }
    if (duration && duration.end) {
      conditionArr.push(`ra.date <= '${duration.end}'`);
    }
    condition += conditionArr.join(' AND ');
    condition += ' ';
    const queryStr = "SELECT COUNT(*) as total FROM (SELECT ra.dept_id " +
      "FROM `" + this.getModel().tableName + "` as ra " +
      condition +
      //"LEFT JOIN `" + this.getModel('Dept').tableName+"` as dept ON dept.id = ra.dept_id " +
      "GROUP BY ra.dept_id) res";

    // console.log(queryStr, '-=-=-=-=')
    return await this.connect.query(queryStr, {
      type: this.sequelize.QueryTypes.SELECT,
    });
  }

  async statisticsResult(offset=0, limit=20, duration) {
    const dataAccessStr = this.dataAccess.join("','");
    const conditionArr = [];
    let condition = `WHERE `;
    conditionArr.push(`ra.dept_id IN ('${dataAccessStr}')`)
    if (duration && duration.start) {
      conditionArr.push(`ra.date >= ${duration.start}`);
    }
    if (duration && duration.end) {
      conditionArr.push(`ra.date <= '${duration.end}'`);
    }
    condition += conditionArr.join(' AND ');
    condition += ' ';
    // const queryStr = "SELECT " +
    //   "ra.dept_id as dept_id, dept.dept_name as dept_name, COUNT(ra.id) as all_times, SUM(ra.people_number) as all_people, SUM(ra.total) as total_amount " +
    //   "FROM `" + this.getModel().tableName + "` as ra " +
    //   "WHERE ra.date>1502527144417 " +
    //   "LEFT JOIN `" + this.getModel('Dept').tableName+"` as dept ON dept.id = ra.dept_id " +
    //   "GROUP BY ra.dept_id " +
    //   "LIMIT :offset,:limit ";

    let queryStr = "SELECT " +
      "ra.dept_id as dept_id, (SELECT dept_name FROM " + this.getModel('Dept').tableName + " WHERE id=dept_id) as dept_name, COUNT(ra.id) as all_times, SUM(ra.people_number) as all_people, SUM(ra.total) as total_amount " +
      "FROM `" + this.getModel().tableName + "` as ra " +
      condition +
      //"LEFT JOIN `" + this.getModel('Dept').tableName+"` as dept ON dept.id = ra.dept_id " +
      "GROUP BY ra.dept_id ";

    let replacements = {};
    if (offset !== null && limit !== null) {
      queryStr += 'LIMIT :offset,:limit ';
      replacements = {
        offset,
        limit,
      }
    }

    return await this.connect.query(
      queryStr,
      {
        replacements,
        type: this.sequelize.QueryTypes.SELECT,
      }
    );
  }

  async statisticsDetails(duration) {

    const dataAccessStr = this.dataAccess.join("','");
    const conditionArr = [];
    let condition = `WHERE `;
    conditionArr.push(`ra.dept_id IN ('${dataAccessStr}')`)
    if (duration && duration.start) {
      conditionArr.push(`ra.date >= ${duration.start}`);
    }
    if (duration && duration.end) {
      conditionArr.push(`ra.date <= ${duration.end}`);
    }
    condition += conditionArr.join(' AND ');
    condition += ' ';

    return await this.connect.query(
      "SELECT " +
      "ra.dept_id as dept_id, rap.person_category as person_category, SUM(rap.people_number) as people_number " +
      "FROM `" + this.getModel('RelaxActionPeople').tableName + "` as rap " +
      "LEFT JOIN `" + this.getModel().tableName + "` as ra ON ra.id = rap.relax_action_id " +
      condition +
      "GROUP BY rap.person_category, ra.dept_id",
      {
        type: this.sequelize.QueryTypes.SELECT,
      }
    )
  }
}