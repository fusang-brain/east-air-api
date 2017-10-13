/**
 * Created by alixez on 17-8-8.
 */

import Service from './Service';
import Response from '../config/response';
export default class RoleService extends Service {
  constructor() {
    super();
    this.modelName = 'Role';
  }

  async checkIsGoodRole(id, deptID = null, userID = null) {
    const Role = this.getModel();
    const User = this.getModel('User');
    const Dept = this.getModel('Dept');
    const department = await Dept.findOne({
      where: {
        id: deptID,
      }
    });

    const checkDepartments = await Dept.all({
      where: {
        parent: department.parent,
      }
    });
    const checkDepartmentIDs = checkDepartments.map(looper => looper.id);
    const companyMaster = ['dept_master', 'dept_finance', 'dept_director', 'chile_dept_master'];
    const foundRole = await Role.findOne({where: {id: id}});
    if (!foundRole) {
      throw {
        code: Response.getErrorCode(),
        message: '请选择正确的角色',
      }
    }
    const condition = {
      where: {
        state: 1,
        role: id,
      }
    };
    if (userID) {
      condition.where.id = {
        $ne: userID,
      }
    }
    if (!companyMaster.includes(foundRole.role_slug)) {
      return true;
    }

    if (deptID && foundRole.role_slug === 'chile_dept_master') {
      console.log(checkDepartmentIDs,'00000');
      condition.where.dept = {
        $in: checkDepartmentIDs,
      };
    }

    const userCount = await User.count(condition);
    console.log(userCount);
    if (userCount > 0) {
      console.log(userID);
      throw {
        code: Response.getErrorCode(),
        message: `本分会已经存在一位${foundRole.role_name}`
      }
    }

    return true;
  }

  async remove(id) {
    const Role = this.getModel();
    const User = this.getModel('User');
    const foundRole = await Role.findOne({where: {id: id}});
    if (!foundRole) {
      throw {
        code: Response.getErrorCode('remove'),
        message: '非法操作',
      }
    }
    if (['root', 'chile_dept_master', 'common_member', 'dept_finance', 'dept_master', 'dept_director'].includes(foundRole.role_slug)) {
      throw {
        code: Response.getErrorCode('remove'),
        message: '系统内置角色，无法删除!',
      }
    }
    const foundUserWithRole = await User.count({where: {role: id}});
    if (foundUserWithRole > 0) {
      throw {
        code: Response.getErrorCode('remove'),
        message: '该角色正在使用中，无法删除',
      }
    }
    await Role.destroy({where: {id: id}});

    return true;
  }

  async getMaster(userID) {

  }
}