/**
 * Created by alixez on 17-6-17.
 */

import DeptService from '../../../service/DeptService';

export default async function (req, params, {response}) {
  const {name, parent_id, dept_id} = req.body;
  const deptService = new DeptService();

  if (await deptService.updateDept(dept_id, parent_id, name)) {
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