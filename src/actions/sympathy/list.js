/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */

import SympathyService from '../../service/SympathyService';
import {filterParams} from '../../utils/filters'
import moment from 'moment';
import Decimal from 'decimal.js';

export default async function (req, params, {response, checkAccess, services}) {
  await checkAccess('sympathy', 'view');
  const args = filterParams(req.query, {
    search: 'string',
    state: 'string',
    kind: 'string',
  });

  // if (!['draft', 'pending', 'success', 'fail'].includes(args.state)) {
  //   return {
  //     code: response.getErrorCode(),
  //     message: '不存在的筛选状态',
  //   }
  // }

  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const sympathyService = services.sympathy;
  let sympathyType = null;
  if (args.kind) {
    if (args.kind === 'YiXian') {
      sympathyType = 3;
    } else if (args.kind === 'KunNan') {
      sympathyType = 1;
    } else if (args.kind === 'ShengBing') {
      sympathyType = 2;
    }
  }
  const res = await sympathyService.generateList({
    offset,
    limit,
    reason: args.search,
    state: args.state,
    sympathyType,
  });

  const mappers = {
    state: ['草稿', '待审批', '已通过', '未通过']
  }

  const listRes = res.list.map(item => ({
    id: item.id,
    reason: item.reason,
    person: item.person,
    sympathy_date: moment(+item.sympathy_date).format('YYYY-MM-DD'),
    apply_time: moment(+item.apply_time).format('YYYY-MM-DD HH:mm:ss'),
    state: item.state,
    state_show: mappers.state[item.state],
    department_name: item.department.dept_name || '-',
    person_num: item.person_num,
    sympathy_cost: Number(item.sympathy_good_cost) + Number(item.sympathy_cost),
    sympathy_type: item.sympathy_type,
  }));

  console.log(listRes);


  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      total: res.total,
      list: listRes,
    }
  }

}