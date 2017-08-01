/**
 * Created by alixez on 17-7-26.
 */
import {filterParams} from '../../utils/filters';
import Decimal from 'decimal.js';

export default async function (req, param, {response, models}) {

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

  if (req.body.isDraft && req.body.isDraft === true) {
    params.state = 0;
  } else {
    params.state = 1;
  }
  if (req.body.grant_apply) {
    params.grant_apply = filterParams(req.body.grant_apply, {
      type: ['integer', 'required'],
      dept_id: ['string', 'required'],
      cost: ['number'],
      purpose: ['string'],
      people_count: ['integer'],
      others: ['string'],
    })
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

  return {
    code: response.getSuccessCode('insert'),
    message: '发布成功',
    data: {
      act: createdAct,
    }
  }
}