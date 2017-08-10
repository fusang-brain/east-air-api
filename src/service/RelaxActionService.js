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
    args.people_number = peopleNumber;
    args.total = Decimal.mul(args.per_capita_budget, args.people_number).toNumber();
    args.apply_date = Date.now();
    return await RelaxAction.create(args, {
      include: [
        {
          model: RelaxActionPeople,
          as: 'people'
        }
      ]
    });

  }

  generateList() {

  }
}