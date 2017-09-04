/**
 * Created by alixez on 17-8-10.
 */

import {filterParams} from '../../utils/filters';
import moment from 'moment';


export default async function (req, params, {response, device, services, checkAccess}) {
  await checkAccess('relax_action', 'start')
  const deptService = services.dept;
  const relaxActionService = services.relaxAction;
  const args = filterParams(req.body, {
    title: ['string', 'required'],
    action_type: ['integer', 'required'],
    per_capita_budget: ['number', 'required'],
    days: ['integer', 'required'],
    date: ['string', 'required'],
    place: ['string', 'required'],
    dept_id: ['string'],
    people: ['array', 'required'],
  });

  if (!args.dept_id) {
    args.dept_id = req.user.dept;
  }

  if (!await deptService.checkIsAvailableDept(args.dept_id)) {
    return {
      code: response.getErrorCode(),
      message: '请选择正确的部门',
    }
  }

  const saveType = params[0];
  if (!['submit', 'draft'].includes(saveType)) {
    return {
      code: response.getErrorCode(),
      message: '不存在的保存类型',
    }
  }

  args.date = moment(+args.date).startOf('day').toDate().getTime();

  if (saveType === 'draft') {
    args.state = 0;
  } else {
    args.state = 1;
  }

  args.user_id = req.user.id;
  const relaxAction = await relaxActionService.create(args);

  return {
    code: response.getSuccessCode('create'),
    message: '创建成功',
    data: {
      relax_action: relaxAction,
    }
  }
};