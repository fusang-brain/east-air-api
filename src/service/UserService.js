/**
 * Created by alixez on 17-8-7.
 */
import Service from './Service'

export default class UserService extends Service {

  constructor () {
    super();
    this.modelName = 'User';
  }

  async getAllMaster(deptID) {
    const Dept = this.getModel('Dept');
    const User = this.getModel('User');
    const masterSlugs = ['dept_master', 'dept_finance', 'dept_director'];
    const childMasterSlugs = 'chile_dept_master';
    const foundDept = await Dept.findOne({
      where: {
        id: deptID,
      }
    });

    const currentDepts = await Dept.all({
      where: {
        parent: foundDept.parent,
      }
    });

    const currentDeptIDs = currentDepts.map(dept => dept.id);

    const childMaster = await User.findOne({
      where: {
        state: 1,
        dept: {
          $in: currentDeptIDs,
        }
      },
      include: [
        {
          model: this.getModel('Role'),
          as: 'user_role',
          required: true,
          where: {
            role_slug: childMasterSlugs,
          }
        }
      ]
    })

    const masters = await User.all({
      where: {
        state: 1
      },
      include: [
        {
          model: this.getModel('Role'),
          as: 'user_role',
          required: true,
          where: {
            role_slug: {
              $in: masterSlugs,
            }
          }
        }
      ]
    });

    masters.push(childMaster);

    return masters;
  }
}