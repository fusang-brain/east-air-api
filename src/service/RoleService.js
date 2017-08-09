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

  async checkIsGoodRole(id, deptID = null) {
    const Role = this.getModel();
    const User = this.getModel('User');
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
        role: id,
      }
    };
    if (!companyMaster.includes(foundRole.role_slug)) {
      return true;
    }

    if (deptID && foundRole.role_slug === 'chile_dept_master') {
      condition.where.dept = deptID;
    }

    const userCount = await User.count(condition);
    if (userCount > 0) {
      throw {
        code: Response.getErrorCode(),
        message: `本部门已经存在一位${foundRole.role_name}`
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
    if (['chile_dept_master', 'common_member', 'dept_finance', 'dept_master', 'dept_director'].includes(foundRole.role_slug)) {
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
}