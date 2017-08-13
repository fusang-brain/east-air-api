/**
 * Created by alixez on 17-8-2.
 */
import Service from './Service';
import ActivityService from './ActivityService';
import SympathyService from './SympathyService';
import Response from '../config/response'

export default class ApprovalService extends Service {

  constructor() {
    super();
    this.modelName = 'Approval';
  }

  async generateApprovalFlowTemp(publishID) {
    const ApprovalFlows = this.getModel('ApprovalFlows');
    const User = this.getModel('User');
    const Dept = this.getModel('Dept');
    const Role = this.getModel('Role');

    // 获取当前活动发起人的部门信息
    const foundUser = await User.findOne({
      where: {
        id: publishID,
      },
      include:[
        {
          model: Dept,
          as: 'department',
          required: true,
        },
        {
          model: Role,
          as: 'user_role',
          required: false,
        }
      ]
    });
    const ApprovalFlow = [];
    const flowMasterRoles = ['dept_finance', 'dept_director', 'dept_master'];

    if (!foundUser) {
      return false;
    }
    let sortNo = 1;

    if (foundUser.user_role.role_slug !== 'chile_dept_master') {
      // 找到当前发起人的分工会主管
      const chileDeptMasterRole = await Role.findOne({
        where: {
          role_slug: 'chile_dept_master',
        }
      });
      let master = await User.findOne({
        where: {
          dept: foundUser.department.id,
          role: chileDeptMasterRole.id,
        },
        include: [
          {
            model: Dept,
            as: 'department',
          },
        ]
      });

      if (master) {
        ApprovalFlow.push({
          name: master.name,
          avatar: master.avatar,
          dept: master.department.dept_name,
          desc: '待审批',
          sort: sortNo,
        });

        sortNo += 1;
      }
    }

    for (let i = 0; i < flowMasterRoles.length; i ++) {
      let role = flowMasterRoles[i];
      // 找到当前发起人的工会主管（财务，主任，主席）
      let deptHead = await User.findOne({
        include: [
          {
            model: Role,
            as: 'user_role',
            where: {
              role_slug: role,
            }
          },
          {
            model: Dept,
            as: 'department',
          },
        ]
      });

      if (!deptHead) {
        continue;
      }

      ApprovalFlow.push({
        name: deptHead.name,
        avatar: deptHead.avatar,
        dept: deptHead.department.dept_name,
        desc: '待审批',
        sort: sortNo + flowMasterRoles.indexOf(deptHead.user_role.role_slug),
      });
    }
    console.log(ApprovalFlow);
    return ApprovalFlow;
  }

  async generateApproval(projectID, publishID, approvalTyoe = 1) {
    return await this.generateActApproval(projectID, publishID, approvalTyoe);
  }

  async generateActApproval(projectID, publishID, approvalType = 1 , device) {
    const Approval = this.getModel();
    const ApprovalFlows = this.getModel('ApprovalFlows');
    const User = this.getModel('User');
    const Dept = this.getModel('Dept');
    const Role = this.getModel('Role');

    // 生成审批
    await Approval.destroy({where: {project_id: projectID}});
    const approval = await Approval.create({
      approval_type: approvalType,
      project_id: projectID,
      publish_id: publishID,
    });

    // 获取当前活动发起人的部门信息
    const foundUser = await User.findOne({
      where: {
        id: publishID,
      },
      include:[
        {
          model: Dept,
          as: 'department',
          required: true,
        },
        {
          model: Role,
          as: 'user_role',
          required: false,
        }
      ]
    });
    const ApprovalFlow = [];
    const flowMasterRoles = ['dept_finance', 'dept_director', 'dept_master'];

    if (!foundUser) {
      return false;
    }
    let sortNo = 1;

    if (foundUser.user_role.role_slug !== 'chile_dept_master') {
      // 找到当前发起人的分工会主管
      const chileDeptMasterRole = await Role.findOne({
        where: {
          role_slug: 'chile_dept_master',
        }
      });
      let master = await User.findOne({
        where: {
          state: 1,
          dept: foundUser.department.id,
          role: chileDeptMasterRole.id,
        }
      });
      if (master) {
        ApprovalFlow.push({
          approval_id: approval.id,
          flow_sort: sortNo,
          approval_man_id: master.id,
          available: 1,
        });
        sortNo += 1;
      }
    }

    // 找到当前发起人的工会主管（财务，主任，主席）
    for (let i = 0; i < flowMasterRoles.length; i ++) {
      let role = flowMasterRoles[i];

      let deptHead = await User.findOne({
        where: {
          state: 1,
        },
        include: [
          {
            model: Role,
            as: 'user_role',
            where: {
              role_slug: role,
            }
          }
        ]
      });

      if (!deptHead) {
        continue;
      }

      ApprovalFlow.push({
        approval_id: approval.id,
        flow_sort: sortNo + flowMasterRoles.indexOf(deptHead.user_role.role_slug),
        approval_man_id: deptHead.id,
      });

    }

    // 生成审批流程
    if (ApprovalFlow.length > 0) {
      await ApprovalFlows.bulkCreate(ApprovalFlow);
    }
    return approval;
  }

  async getApprovalDetail(approvalID) {
    const Approval = this.getModel();
    const User = this.getModel('User');
    const Dept = this.getModel('Dept');
    const activityService = new ActivityService();
    const sympathyService = new SympathyService();
    const approval = await Approval.findOne({
      where: {project_id: projectID},
      include: [
        {
          model: User,
          as: 'publisher',
          attributes: ['id', 'name', 'avatar'],
        }
      ]
    });

    if (!approval) {
      return {
        code: Response.getErrorCode(),
        message: '该审批已被删除',
      }
    }

    // TODO get project details
    let project = {};
    if (approval.approval_type === 1) {
      project = await activityService.details(approval.project_id);
    } else if (approval.approval_type === 2) {
      project = await sympathyService.details(approval.project_id);
    }



    const publisher = {
      name: approval.publisher.name,
      avatar: approval.publisher.avatar,
      desc: '发起申请',
      time: approval.publish_date,
      state: 1,
      sort: 0,
    };

    const approvalFlows = await this.approvalFlows(approval.id, publisher);
    approval.setDataValue('flows', approvalFlows);
    approval.setDataValue('project', project);
    return approval;
  }


  async getActApprovalDetail(approvalID) {
    const Approval = this.getModel();
    const User = this.getModel('User');
    const activityService = new ActivityService();

    const approval = await Approval.findOne({
      where: {
        id: approvalID,
      },
      include: [
        {
          model: User,
          as: 'publisher',
          attributes: ['id', 'name', 'avatar'],
        }
      ]
    });

    if (approval) {
      let act = await activityService.details(approval.project_id)
      approval.setDataValue('project', act);
    }

    const publisher = {
      name: approval.publisher.name,
      avatar: approval.publisher.avatar,
      desc: '发起申请',
      time: approval.publish_date,
      state: 1,
      sort: 0,
    };

    const flows = await this.approvalFlows(approvalID, publisher);
    approval.setDataValue('flows', flows);
    return approval;
  }

  async approvalFlows(approval_id, publisher=null) {
    const ApprovalFlows = this.getModel('ApprovalFlows');
    const User = this.getModel('User');
    const approvalFlows = await ApprovalFlows.all({
      where: {
        approval_id: approval_id,
      },
      include: [
        {
          model: User,
          as: 'approval_man',
        },
      ],
      order: [
        ['flow_sort', 'ASC'],
      ]
    });
    const sort = [1, 2, 3, 4];
    if (!publisher) {
      const Approval = this.getModel('Approval');
      const approval = await Approval.findOne({
        where: {id: approval_id},
        include: [
          {
            model: User,
            as: 'publisher',
            attributes: ['id', 'name', 'avatar'],
          }
        ]
      });
      publisher = {
        name: approval.publisher.name,
        avatar: approval.publisher.avatar,
        desc: '发起申请',
        time: approval.publish_date,
        state: 1,
        sort: 0,
      };
    }
    const flows = [
      publisher,
    ];

    for (let i = 0; i < approvalFlows.length; i ++) {
      let item = approvalFlows[i];

      if (+item.flow_sort !== sort[i]) {
        continue;
      }

      flows.push({
        name: item.approval_man.name,
        avatar: item.approval_man.avatar,
        desc: item.result === 0 ? '待审批' : item.content,
        time: item.approval_date,
        state: item.result,
        sort: i + 1,
      });
    }

    return flows;
  }

  async getApprovalIDByProjectID(projectID) {
    const approval = await this.getModel().findOne({
      where: {project_id: projectID},
    });

    if (!approval) {
      return false;
    }

    return approval.id;
  }

  async waitCount(approvalType=1, userID) {
    const Approval = this.getModel();
    const ApprovalFlows = this.getModel('ApprovalFlows');

    return await Approval.count({
      where: {
        approval_type: approvalType,
      },
      include: [
        {
          model: ApprovalFlows,
          as: 'flows',
          where: {
            approval_man_id: userID,
            available: 1,
            result: 0,
          },
          required: true,
        }
      ]
    });
  }
}