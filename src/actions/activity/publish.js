/**
 * Created by alixez on 17-7-26.
 */
import {filterParams} from '../../utils/filters';
import {ApprovalService} from '../../service';
import {getMasterRole} from '../../config/init_data';
import Decimal from 'decimal.js';

export default async function (req, param, {response, models}) {
  const roles = getMasterRole();
  if (roles.includes(req.user.user_role.role_slug)) {
    return {
      code: response.getErrorCode(),
      message: '您不能发起活动',
    }
  }
  const params = filterParams(req.body, {
    act_type: ['integer', 'required'],
    subject: ['string', 'required'],
    purpose: ['string', 'required'],
    target: ['string', 'required'],
    address: ['string', 'required'],
    start_date: ['string', 'required'],
    end_date: ['string', 'required'],
    process: ['string', 'required'],
    integration: ['integer'],
  });

  if (req.body.is_draft && req.body.is_draft === true) {
    params.state = 0;
  } else {
    params.state = 1;
  }
  if (req.body.grant_apply) {
    params.grant_apply = filterParams(req.body.grant_apply, {
      type: ['number'],
      dept_id: ['string'],
      cost: ['number'],
      purpose: ['string'],
      people_count: ['integer'],
      items: ['array'],
      others: ['string'],
    });
    if (params.grant_apply.items && params.grant_apply.items.length > 0) {
      let items = params.grant_apply.items;
      let cost = 0;
      for (let i = 0; i < items.length; i ++) {
        let item = items[i];
        let total = Decimal.mul(item.price, item.count).toNumber();
        item.total = total;
        cost = Decimal.add(cost, total).toNumber();
      }
      params.grant_apply.cost = cost;
    }
  }
  params.user_id = req.user.id;
  params.dept_id = req.user.dept;
  const TradeUnionAct = models.TradeUnionAct;

  const budgets = req.body.budgets;
  const images = req.body.images || [];
  const attach = req.body.attach || [];
  if (!budgets) {
    return {
      code: response.getErrorCode(),
      message: '请上传预算明细',
    }
  }
  if (!Array.isArray(budgets)) {
    return {
      code: response.getErrorCode(),
      message: '预算格式错误',
    }
  }
  params.budget_total = 0;
  for (let i = 0; i < budgets.length; i ++) {
    params.budget_total = Decimal.add(params.budget_total, budgets[i].cost).toNumber();
  }

  params.budgets = budgets;
  params.images = images.map(loop => ({
    file_path: loop,
    no: 1,
  }));
  params.attach = attach.map(loop => ({
    file_path: loop,
    no: 1,
  }));
  const createdAct = await TradeUnionAct.create(params, {
    include: [
      {
        model: models.GrantApplication,
        as: 'grant_apply',
        include: [
          {
            model: models.GrantItem,
            as: 'items'
          }
        ]
      },
      {
        model: models.TradeUnionActBudget,
        as: 'budgets',
      },{
        model: models.TradeUnionActAttach,
        as: 'attach',
      },{
        model: models.TradeUnionActImage,
        as: 'images',
      }
    ]
  });

  const approvalService = new ApprovalService();
  await approvalService.generateActApproval(createdAct.id, req.user.id);

  return {
    code: response.getSuccessCode('insert'),
    message: '发布成功',
    data: {
      act: createdAct,
    }
  }
}