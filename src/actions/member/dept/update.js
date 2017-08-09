/**
 * Created by alixez on 17-6-17.
 */

import DeptService from '../../../service/DeptService';
import {filterParams} from '../../../utils/filters';
export default async function (req, params, {response}) {
  const args = filterParams(req.body, {
    dept_name: ['string', 'required'],
    parent: 'string',
    dept_id: ['string', 'required'],
  });
  const {dept_id, ...values} = args;
  const deptService = new DeptService();

  if (await deptService.updateDept(dept_id, values)) {
    return {
      code: response.getSuccessCode('update'),
      message: '更新成功',
    }
  }

  return {
    code: response.getErrorCode('update'),
    message: '更新失败',
  }
}