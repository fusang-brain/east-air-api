/**
 * Created by alixez on 17-6-17.
 */

import {getErrorCode, getSuccessCode} from '../../../config/response';

export default async function(req, params, {models}) {

  const {parentID, name} = req.body;
  const DeptModel = models.Dept;
  let treeLevel = 1;
  if (parentID) {
    const parentDept = await DeptModel.findOne({where: {id: parentID}});
    if (parentDept) {
      treeLevel = parentDept.tree_level + 1;
    }
  }
  const createdDept = await DeptModel.create({
    tree_level: treeLevel,
    parent: parentID || '',
    dept_name: name,
  });

  return {
    code: getSuccessCode('insert'),
    message: '工会创建成功',
    data: {
      dept: createdDept,
    }
  }
}