/**
 * Created by alixez on 17-8-8.
 */
import Service from './Service';
import Response from '../config/response';

export default class DeptService extends Service {
  constructor() {
    super();
    this.modelName = 'Dept';
  }

  async updateDept(deptID, parentID, name) {
    let treeLevel = 1;
    const Dept = this.getModel();
    if (parentID) {
      const parentDept = await Dept.findOne({where: {id: parentID}});
      if (parentDept) {
        treeLevel = parentDept.tree_level + 1;
      }
    }

    await Dept.update({
      tree_level: treeLevel,
      parent: parentID || '',
      dept_name: name,
    }, {
      where: {
        id: deptID,
      }
    });

    return true;
  }

  async checkIsAvailableDept(deptID) {
    const Dept = this.getModel();
    const department = await Dept.findOne({where: {id: deptID}});
    if (!department) {
      throw {
        code: Response.getErrorCode(),
        message: '不存在该部门',
      }
    }

    return department.tree_level === 3;
  }

}