
import Service from './Service';
import Decimal from 'decimal.js';
import Response from '../config/response';

export default class SympathyService extends Service {

  constructor() {
    super();
    this.modelName = 'Sympathy';
    this.Sympathy = this.getModel();
  }

  async create(args) {

    args.sympathy_cost = new Decimal(+args.sympathy_cost).toNumber();
    args.sympathy_good_cost = new Decimal(+args.sympathy_good_cost).toNumber();
    args.apply_time = Date.now().toString();
    return await this.Sympathy.create(args);
  }

  async update(params) {
    const {id, ...args} = params;

    const foundSympathy = await this.Sympathy.findOne({where: {id}});
    if (![0, 3].includes(foundSympathy.state)) {
      throw {
        code: Response.getErrorCode(),
        message: '本资源不能被修改',
      }
    }

    args.sympathy_cost = new Decimal(+args.sympathy_cost).toNumber();
    args.sympathy_good_cost = new Decimal(+args.sympathy_good_cost).toNumber();
    return await this.Sympathy.update(args, {
      where: {id},
    });
  }

  async generateList({offset, limit, state, reason}) {
    let condition = {};
    switch (state) {
      case 'draft':
        condition.state = 0;
        break;
      case 'pending':
        condition.state = 1;
        break;
      case 'success':
        condition.state = 2;
        break;
      case 'fail':
        condition.state = 3;
        break;
      default:
        break;
    }
    if (reason) {
      condition.reason = {
        $like: `%${reason}%`
      }
    }
    const total = await this.Sympathy.count({
      where: condition,
    });
    const list = await this.Sympathy.all({
      attributes: ['id', 'reason', 'person', 'sympathy_date', 'apply_time', 'state'],
      where: condition,
      offset,
      limit,
      include: [
        {
          model: this.getModel('Dept'),
          as: 'department',
        }
      ]
    });

    return {list, total};

  }

  async remove(id) {
    const foundTheSympathy = await this.Sympathy.findOne({where: {id: id}});
    const Approval = this.getModel('Approval');
    const ApprovalFlows = this.getModel('ApprovalFlows');

    if (!foundTheSympathy) {
      throw {
        code: Response.getErrorCode(),
        message: '该资源不存在',
      }
    }

    if (![0, 3].includes(foundTheSympathy.state)) {
      throw {
        code: Response.getErrorCode(),
        message: '本资源不可被删除',
      }
    }

    const foundApproval = await Approval.findOne({where: {project_id: foundTheSympathy.id}});

    await this.Sympathy.destroy({where: {id: id}});
    await Approval.destroy({where: {project_id: id}});
    if (foundApproval) {
      await ApprovalFlows.destroy({where: {approval_id: foundApproval.id}});
    }

    return true;
  }

  async details(id) {
    return await this.Sympathy.findOne({
      where: {id},
      include: [
        {
          model: this.getModel('User'),
          as: 'publisher',
        },
        {
          model: this.getModel('Dept'),
          as: 'department',
        }
      ]
    });
  }

}