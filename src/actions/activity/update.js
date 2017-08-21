/**
 * Created by alixez on 17-7-29.
 */

/**
 * Created by alixez on 17-7-26.
 */
import {filterParams} from '../../utils/filters';
import ApprovalService from '../../service/ApprovalService';
import Decimal from 'decimal.js';

export default async function (req, param, {response, models, checkAccess}) {
  await checkAccess('activity', 'edit');

  const actID = req.body.act_id;
  const params = filterParams(req.body, {
    act_type: ['integer'],
    subject: ['string'],
    purpose: ['string'],
    target: ['string'],
    address: ['string'],
    start_date: ['string'],
    end_date: ['string'],
    process: ['string'],
    integration: ['integer'],
  });

  const foundAct = await models.TradeUnionAct.findOne({where: {id: actID, dept_id: {$in: req.dataAccess}}});
  if (!foundAct) {
    return {
      code: response.getErrorCode(),
      message: '没有找到该活动',
    }
  }
  if (![0, 3].includes(foundAct.state)) {
    return {
      code: response.getErrorCode('remove'),
      message: '此活动无法修改',
    }
  }

  if (req.body.is_draft && req.body.is_draft === true) {
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
      items: ['array'],
      others: ['string'],
    });

    if (params.grant_apply.items && params.grant_apply.items.length > 0) {
      let items = params.grant_apply.items;
      let cost = 0;
      for (let i = 0; i < items.length; i ++) {
        let item = items[i];
        delete item.id;
        let total = Decimal.mul(item.price, item.count).toNumber();
        item.total = total;
        item.grant_apply_id = foundAct.grant_apply_id;
        cost = Decimal.add(cost, total).toNumber();
      }
      params.grant_apply.cost = cost;
      params.grant_apply.is_act = true;
    }
  }
  params.user_id = req.user.id;
  params.dept_id = req.user.dept;
  const TradeUnionAct = models.TradeUnionAct;
  const budgets = req.body.budgets;
  const images = req.body.images || [];
  const attach = req.body.attach || [];

  if (budgets) {
    if (!Array.isArray(budgets)) {
      return {
        code: response.getErrorCode(),
        message: '预算格式错误',
      }
    }
    if (budgets.length === 0) {
      return {
        code: response.getErrorCode(),
        message: '预算为必填项',
      }
    }
  }
  if (budgets) {
    params.budget_total = 0;
    for (let i = 0; i < budgets.length; i ++) {
      budgets[i].act_id = actID;
      params.budget_total = Decimal.add(params.budget_total, budgets[i].cost).toNumber();
    }
    await models.TradeUnionActBudget.destroy({where:{act_id: actID}});
    await models.TradeUnionActBudget.bulkCreate(budgets);
  }
  if (params.grant_apply) {
    params.grant_apply.is_act = true;
    await models.GrantApplication.update(params.grant_apply, {where: {id: foundAct.grant_apply_id}});

    if (params.grant_apply.items && params.grant_apply.items.length > 0) {

      await models.GrantItem.destroy({where: {grant_apply_id: foundAct.grant_apply_id}});

      await models.GrantItem.bulkCreate(params.grant_apply.items);
    }
  }

  params.images = images.map(loop => ({
    act_id: actID,
    file_path: loop,
    no: 1,
  }));
  params.attach = attach.map(loop => ({
    act_id: actID,
    file_path: loop,
    no: 1,
  }));
  if (params.images.length >= 0) {
    models.TradeUnionActImage.destroy({where:{act_id: actID}});
    models.TradeUnionActImage.bulkCreate(params.images);
  }
  if (params.attach.length >= 0) {
    models.TradeUnionActAttach.destroy({where:{act_id: actID}});
    models.TradeUnionActAttach.bulkCreate(params.attach);
  }

  // if (params.attach.length === 0) {
  //   models.TradeUnionAttach.destroy({where: {act_id: actID}});
  // }
  //
  // if (params.images.length === 0) {
  //   models.TradeUnionActImage.destroy({where:{act_id: actID}});
  // }

  const act = await TradeUnionAct.update(params, {
    where: {
      id: actID,
    }
  });

  const updatedAct = await TradeUnionAct.findOne({
    where: {
      id: actID,
    }
  })

  let hasGrant = false;
  if (updatedAct.budget_total !== 0) {
    hasGrant = true;
  }

  if (params.state = 1) {
    const approvalService = new ApprovalService();
    await approvalService.generateActApproval(actID, req.user.id, 1, {
      project_subject: updatedAct.subject,
      project_type: updatedAct.act_type,
      project_purpose: updatedAct.purpose,
      project_content: updatedAct.process,
      dept_id: updatedAct.dept_id,
      total_amount: updatedAct.budget_total,
      has_grant: hasGrant,
    });
  }

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功'
  }
}