/**
 * Created by alixez on 17-8-7.
 */

import Service from './Service';
import Decimal from 'decimal.js';
import Response from '../config/response';

export default class GrantApplicationService extends Service {

  constructor() {
    super();
    this.modelName = 'GrantApplication';
    this.typeMapper = ['未知', '慰问困难、生病员工', '慰问一线员工', '文体活动', '疗养休费', '培训费', '会务费', '固定资产', '其他']
    this.GrantApplication = this.getModel('GrantApplication');
    this.GrantAttach = this.getModel('GrantAttach');
    this.GrantItem = this.getModel('GrantItem');
  }

  async remove(id) {
    const foundTheGrantApply = await this.GrantApplication.findOne({
      where: {
        id,
        dept_id: {
          $in: this.dataAccess,
        },
      }
    });

    const Approval = this.getModel('Approval');
    const ApprovalFlows = this.getModel('ApprovalFlows');

    if (!foundTheGrantApply) {
      throw {
        code: Response.getErrorCode(),
        message: '该资源不存在',
      }
    }

    if (![0, 3, 4].includes(foundTheGrantApply.state)) {
      throw {
        code: Response.getErrorCode(),
        message: '本资源不可被删除',
      }
    }

    const foundApproval = await Approval.findOne({where: {project_id: foundTheGrantApply.id}});
    await this.GrantApplication.destroy({where: {id}});
    await this.GrantAttach.destroy({where: {grant_application_id:id}});
    await this.GrantItem.destroy({where: {grant_apply_id: id}});
    if (foundApproval) {
      await Approval.destroy({where: {id: foundApproval.id}});
      await ApprovalFlows.destroy({where: {approval_id: foundApproval.id}});
    }

    return true;
  }

  async update(params) {
    const {id, items, attach, ...args} = params;
    const GrantAttach = this.getModel('GrantAttach');
    const GrantItem = this.getModel('GrantItem');
    const foundGrant = await this.GrantApplication.findOne({
      where: {
        id,
        dept_id: {
          $in: this.dataAccess,
        }
      }
    });
    if (!foundGrant) {
      throw {
        code: Response.getErrorCode(),
        message: '该资源不存在',
      }
    }
    if (![0, 3, 4].includes(foundGrant.state)) {
      throw {
        code: Response.getErrorCode(),
        message: '本资源不可修改',
      }
    }

    if (args.type) {
      args.type_string = this.typeMapper[+args.type];
      foundGrant.type_string = args.type_string;
    }


    if (items && items.length > 0) {
      let cost = 0;
      for (let i = 0; i < items.length; i ++) {
        let item = items[i];
        let total = Decimal.mul(item.price, item.count).toNumber();
        item.total = total;
        item.grant_apply_id = foundGrant.id;
        cost = Decimal.add(cost, total).toNumber();
      }

      await GrantItem.destroy({where: {grant_apply_id: foundGrant.id}});
      await GrantItem.bulkCreate(items);
      args.cost = cost;
    }

    if (attach && attach.length > 0) {
      let rightAttach = attach.map(loop => ({
        grant_application_id: foundGrant.id,
        file_path: loop,
      }));
      await GrantAttach.destroy({where: {grant_application_id: foundGrant.id}});
      await GrantAttach.bulkCreate(rightAttach);
    }

    await this.GrantApplication.update(args, {
      where: {id},
    });

    return foundGrant;
  }

  async create(args) {

    if (!args.type) {
      args.type = 0;
    }

    args.type_string = this.typeMapper[+args.type];

    if (args.items && args.items.length > 0) {
      let items = args.items;
      let cost = 0;
      for (let i = 0; i < items.length; i ++) {
        let item = items[i];
        let total = Decimal.mul(item.price, item.count).toNumber();
        item.total = total;
        cost = Decimal.add(cost, total).toNumber();
      }
      args.cost = cost;
    }

    if (args.attach && args.attach.length > 0) {
      args.attach = args.attach.map(loop => ({
        file_path: loop,
      }));
    } else {
      args.attach = [];
    }


    return await this.GrantApplication.create(args, {
      include: [
        {
          model: this.GrantAttach,
          as: 'attach',
        },
        {
          model: this.GrantItem,
          as: 'items',
        }
      ]
    });
  }

  async generateList({offset, limit, state, search}) {
    let condition = {
      is_act: false,
      dept_id: {
        $in: this.dataAccess,
      }
    };
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

    if (search) {
      condition.type_string = {
        $like: `%${search}%`
      }
    }

    const total = await this.GrantApplication.count({where: condition});
    const list = await this.GrantApplication.all({
      where: condition,
      offset,
      limit,
      include: [
        {
          model: this.getModel('GrantItem'),
          as: 'items',
          required: false,
        },
        {
          model: this.getModel('GrantAttach'),
          as: 'attach',
          required: false,
        },
        {
          model: this.getModel('Dept'),
          as: 'dept',
          required: false,
        },
        {
          model: this.getModel('User'),
          as: 'publisher',
          required: false,
          attributes: ['id', 'name', 'avatar']
        }
      ]
    });

    return {
      total,
      list,
    }
  }

  async details(id) {
    return await this.GrantApplication.findOne({
      where: {
        id,
        dept_id: {
          $in: this.dataAccess,
        }
      },
      include: [
        {
          model: this.getModel('GrantItem'),
          as: 'items',
        },
        {
          model: this.getModel('GrantAttach'),
          as: 'attach',
        },
        {
          model: this.getModel('Dept'),
          as: 'dept',
        },
        {
          model: this.getModel('User'),
          as: 'publisher',
          attributes: ['id', 'name', 'avatar']
        }
      ]
    })
  }

}