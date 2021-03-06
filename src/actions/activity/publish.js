/**
 * Created by alixez on 17-7-26.
 */
import {filterParams} from '../../utils/filters';
import {ApprovalService} from '../../service';
import {getMasterRole} from '../../config/init_data';
import Decimal from 'decimal.js';


/**
 * Publish Activity
 * @param req HttpRequest object
 * @param params Request params
 * @param response Response class
 * @param models Mapper of models
 * @param device The device of user
 * @param services Mapper of services
 * @returns Object Response Object
 */
export default async function (req, param, {response, models, checkAccess}) {
  await checkAccess('activity', 'create');
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
    // dept_ids: ['array', 'required'],
  });

  if (req.body.is_draft && req.body.is_draft === true) {
    params.state = 0;
  } else {
    params.state = 1;
  }
  if (req.body.grant_apply && Object.keys(req.body.grant_apply).length > 0) {

    // execute the grant of activity
    params.grant_apply = filterParams(req.body.grant_apply, {
      type: ['number'],
      dept_id: ['string'],
      cost: ['number'],
      purpose: ['string'],
      people_count: ['integer'],
      items: ['array'],
      others: ['string'],
    });
    params.grant_apply.is_act = true;
    if (!params.grant_apply.dept_id) {
      // params.grant_apply.dept_id = req.user.dept;
      params.grant_apply.dept_id = req.user.parentDept;
    }
    if (!params.grant_apply.type) {
      params.grant_apply.type = 0;
    }
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
  // params.dept_id = req.user.dept;
  params.dept_id = req.user.parentDept;
  const TradeUnionAct = models.TradeUnionAct;

  const budgets = req.body.budgets;
  const images = req.body.images || [];
  const attach = req.body.attach || [];
  const acceptDeptIDs = req.body.dept_ids || [];

  if (!Array.isArray(acceptDeptIDs)) {
    return {
      code: response.getErrorCode(),
      message: '请上传正确的活动部门',
    }
  }

  if (!acceptDeptIDs.includes(req.user.dept)) {
    acceptDeptIDs.push(req.user.dept);
  }

  params.accept_depts = acceptDeptIDs.map(deptID => ({
    dept_id: deptID,
  }));

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
    budgets[i].sort = i;
    params.budget_total = Decimal.add(params.budget_total, budgets[i].cost).toNumber();
  }
  params.budgets = budgets;
  params.images = images.map(loop => ({
    file_path: loop,
  }));

  // attach upload changed
  const allAttachFiles = await models.File.all({
    where: {
      path: {
        $in: attach,
      }
    }
  });

  params.attach = allAttachFiles.map(loop => ({
    file_path: loop.path,
    size: loop.size,
    origin_filename: loop.origin_filename,
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
      },{
        model: models.TradeUnionActDept,
        as: 'accept_depts',
      }
    ]
  });

  let hasGrant = false;
  if (createdAct.budget_total !== 0) {
    hasGrant = true;
  }

  const approvalService = new ApprovalService();
  await approvalService.generateActApproval(createdAct.id, req.user.id, 1, {
    project_subject: createdAct.subject,
    project_type: createdAct.act_type,
    project_purpose: createdAct.purpose,
    project_content: createdAct.process,
    dept_id: createdAct.dept_id,
    total_amount: createdAct.budget_total,
    has_grant: hasGrant,
  });

  return {
    code: response.getSuccessCode('insert'),
    message: '发布成功',
    data: {
      act: createdAct,
    }
  }
}