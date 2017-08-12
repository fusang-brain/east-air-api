/**
 * Created by alixez on 17-8-10.
 */

import Service from './Service';
import Decimal from 'decimal.js';
import Response from '../config/response';

export default class RelaxActionService extends Service {
  constructor() {
    super();
    this.modelName = 'RelaxAction';
    this.dbName = 'RelaxActions';
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
      people[i].dept_id = deptID;
      peopleNumber = peopleNumber + parseInt(item.people_number);
    }
    args.people_number = peopleNumber;
    args.total = Decimal.mul(args.per_capita_budget, args.people_number).toNumber();
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

  async remove(id) {
    const relaxAction = await this.RelaxAction.findOne({where:{id: id}});
    if (!relaxAction) {
      return;
    }
    if (relaxAction.state !== 1) {
      throw {
        code: Response.getErrorCode(),
        message: '只有草稿可以修改!',
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
    const relaxAction = await this.RelaxAction.findOne({where:{id: id}});
    if (!relaxAction) {
      return;
    }
    if (relaxAction.state !== 1) {
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
      params.total = Decimal.mul(perCapitaBudget, params.people_number).toNumber();
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
    let condition = {};
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

    return await this.RelaxAction
      .all({
        where: condition,
        attributes: ['no', 'title', 'action_type', 'apply_time', 'state'],
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

  }

  async details(id) {

    return await this.RelaxAction.findOne({
      where: {
        id: id,
      },
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
  }

  async statisticsResult() {

    return await this.connect.query(
      "SELECT " +
      "ra.dept_id as dept_id, dept.dept_name as dept_name, COUNT(ra.id) as all_times, SUM(ra.people_number) as all_people, SUM(ra.total) as total_amount " +
      "FROM `" + this.getModel().tableName + "` as ra " +
      "LEFT JOIN `" + this.getModel('Dept').tableName+"` as dept ON dept.id = ra.dept_id " +
      "GROUP BY ra.dept_id",
      {
        type: this.sequelize.QueryTypes.SELECT,
      }
    );
  }

  async statisticsDetails() {
    return await this.connect.query(
      "SELECT " +
      "ra.dept_id as dept_id, rap.person_category as person_category, SUM(rap.people_number) as people_number " +
      "FROM `" + this.getModel('RelaxActionPeople').tableName + "` as rap " +
      "LEFT JOIN `" + this.getModel().tableName + "` as ra ON ra.id = rap.relax_action_id " +
      "GROUP BY rap.person_category, ra.dept_id",
      {
        type: this.sequelize.QueryTypes.SELECT,
      }
    )
  }
}