/**
 * Created by alixez on 17-8-8.
 */
import Service from './Service';
import Response from '../config/response';

export default class DeptService extends Service {
  constructor() {
    super();
    this.modelName = 'Dept';
    this.dataAccess = [];
  }

  async updateDept(deptID, values) {
    let treeLevel = 1;
    const Dept = this.getModel();
    if (values.parent) {
      const parentDept = await Dept.findOne({where: {id: values.parent}});
      if (parentDept) {
        treeLevel = parentDept.tree_level + 1;
      }

      values.tree_level = treeLevel;
    }

    await Dept.update(values, {
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

  async deptStruct() {

    const DeptModel = this.getModel('Dept');
    const UserModel = this.getModel('User');
    const deepDeptLevel = await DeptModel.findOne({
      attributes: [[this.connect.fn('MAX', this.connect.col('tree_level')), 'max_tree_level']],
    });


    const getIncludeArgs = (times) => {
      let includeArgs = [];
      //if (device === 'app' || renderType === 'with_member') {
        includeArgs = [
          {model: DeptModel, as: 'children'},
          // {model: UserModel, as: 'members', required: false, attributes: ['id', 'name', 'avatar']}
        ];
      // } else {
      //   includeArgs = [
      //     {model: models.Dept, as: 'children'},
      //   ]
      // }

      times -= 1;
      if (times !== 0) {
        includeArgs[0].include = getIncludeArgs(times);
      }

      return includeArgs;
    };

    const includeArgs = getIncludeArgs(deepDeptLevel.dataValues.max_tree_level);

    const list =  await DeptModel.all({
      where: {tree_level: 1},
      include: includeArgs,
    });

    for (let i = 0; i < list.length; i ++) {
      let item = list[i];
      item.dataValues.member_total = 0;
    }

    return list;
  }

}