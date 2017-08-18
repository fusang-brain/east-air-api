/**
 * Created by alixez on 17-8-2.
 */
import Service from './Service';
import ActivityService from './ActivityService';
import SympathyService from './SympathyService';
import GrantApplicationService from './GrantApplicationService';
import NotificationService from './NotificationService';
import Response from '../config/response'

const notificationService = new NotificationService();

export default class ApprovalService extends Service {

  constructor() {
    super();
    this.modelName = 'Approval';
    this.dataAccess = [];
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

  async generateApproval(projectID, publishID, approvalType, {project_subject, project_content, project_purpose, project_type, dept_id, total_amount, has_grant}) {
    return await this.generateActApproval(projectID, publishID, approvalType, {project_subject, project_content, project_purpose, project_type, dept_id, total_amount, has_grant});
  }

  async generateActApproval(projectID, publishID, approvalType = 1 , {project_subject, project_content, project_purpose, project_type, dept_id, total_amount, has_grant}) {
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
      project_subject,
      project_type,
      project_content,
      project_purpose,
      dept_id,
      total_amount,
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
    if (has_grant) {
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
        let available = 0;
        if (i === 0 && foundUser.user_role.role_slug === 'chile_dept_master') {
          available = 1;
        }

        ApprovalFlow.push({
          approval_id: approval.id,
          available,
          flow_sort: sortNo + flowMasterRoles.indexOf(deptHead.user_role.role_slug),
          approval_man_id: deptHead.id,
        });

      }
    }

    // 生成审批流程
    if (ApprovalFlow.length > 0) {
      console.log(ApprovalFlow);
      await ApprovalFlows.bulkCreate(ApprovalFlow);

      // 发送消息
      await notificationService.sendToPersonal({
        title: '您有一条新的审批!',
        body: project_subject,
        sender: '',
        items: [
          {
            subject_id: approval.id,
            subject_type: approvalType,
            is_approval: true,
          }
        ],
        receiver: ApprovalFlow[0].approval_man_id,
      })
    }
    return approval;
  }

  async getApprovalDetail(approvalID, dataAccess) {
    const Approval = this.getModel();
    const User = this.getModel('User');
    const activityService = new ActivityService();
    const sympathyService = new SympathyService();
    const grantApplicationService = new GrantApplicationService();
    const approval = await Approval.findOne({
      where: {id: approvalID, dept_id: {
        $in: dataAccess,
      }},
      include: [
        {
          model: User,
          as: 'publisher',
          attributes: ['id', 'name', 'avatar'],
        }
      ]
    });

    if (!approval) {
      throw {
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
    } else if (approval.approval_type === 3) {
      project = await grantApplicationService.details(approval.project_id);
    } else {
      throw {
        code: Response.getErrorCode(),
        message: '不存在的审批类型',
      }
    }

    const publisher = {
      user_id: approval.publisher.id,
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
        dept_id: {
          $in: this.dataAccess,
        }
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
        user_id: approval.publisher.id,
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
        user_id: item.approval_man.id,
        name: item.approval_man.name,
        avatar: item.approval_man.avatar,
        desc: item.result === 0 ? '待审批' : item.content,
        time: item.approval_date,
        state: item.result,
        sort: i + 1,
        result: item.result,
        available: item.available,
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
        dept_id: {
          $in: this.dataAccess,
        }
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

  async approvalList({state, search, offset, limit, user_id, type}) {
    const Approval = this.getModel();
    const condition = {};
    let stateCondition = [0, 1, 2];
    if (state === 'all') {
      stateCondition = [0, 1, 2];
    }
    if (state === 'pending') {
      stateCondition = [0];
    }
    if (state === 'success') {
      stateCondition = [1];
    }

    if (state === 'failed') {
      stateCondition = [2];
    }

    if (state === 'finished') {
      stateCondition = [1, 2]
    }
    let approval_type = null;
    if (type === 'all') {
      approval_type = [1,2,3];
    } else if (type === 'act') {
      approval_type = [1,2];
    } else if (type === 'grant') {
      approval_type = [3];
    } else {
      approval_type = [1,2,3];
    }
    condition.approval_type = {
      $in: approval_type,
    };
    if (search) {
      condition.project_subject = {
        $like: `%${search}%`,
      }
    }
    condition.dept_id = {
      $in: this.dataAccess,
    }

    const undoTotal = await Approval.count({
      where: {
        approval_type: {
          $in: approval_type,
        }
      },
      include: [
        {
          model: this.getModel('ApprovalFlows'),
          as: 'flows',
          where: {
            approval_man_id: user_id,
            available: 1,
            result: 0,
          },
          required: true,
        }
      ]
    });

    const total = await Approval.count({
      where: condition,
      include: [
        {
          model: this.getModel('ApprovalFlows'),
          as: 'flows',
          where: {
            approval_man_id: user_id,
            available: 1,
            result: {
              $in: stateCondition
            },
          },
          required: true,
        }
      ]
    });

    const approvals = await Approval.all({
      where: condition,
      offset,
      limit,
      include: [
        {
          model: this.getModel('ApprovalFlows'),
          as: 'flows',
          where: {
            approval_man_id: user_id,
            available: 1,
            result: {
              $in: stateCondition
            },
          },
          required: true,
        },
        {
          model: this.getModel('Dept'),
          as: 'department',
        }
      ]
    });

    return {
      undo_total: undoTotal,
      total,
      approvals,
    }
  }

  async executeApproval({approval_id, result, content, user_id}) {
    const Approval = this.getModel('Approval');
    const User = this.getModel('User');
    const Role = this.getModel('Role');
    const ApprovalFlows = this.getModel('ApprovalFlows');

    const foundApprovalFlow = await ApprovalFlows.findOne({
      where: {
        approval_id: approval_id,
        approval_man_id: user_id,
      },
      include: [
        {
          model: Approval,
          as: 'approval',
        },
        {
          model: User,
          as: 'approval_man',
          include: {
            model: Role,
            as: 'user_role',
          }
        }
      ]
    });

    if (!foundApprovalFlow) {
      throw {
        code: Response.getErrorCode(),
        message: '非法请求!'
      }
    }

    foundApprovalFlow.content = content;
    foundApprovalFlow.result = result;
    foundApprovalFlow.approval_date = Date.now();

    await foundApprovalFlow.save();
    const approvalType = foundApprovalFlow.approval.approval_type;
    let ProjectModel = null;
    let is_act = false;
    if (approvalType === 1) {
      ProjectModel = this.getModel('TradeUnionAct');
      const act = await ProjectModel.findOne({
        where: {
          id: foundApprovalFlow.approval.project_id,
        }
      });
      if (act.budget_total === 0) {
        is_act = true;
      }
    } else if (approvalType === 2) {
      ProjectModel = this.getModel('Sympathy');
    } else if (approvalType === 3) {
      ProjectModel = this.getModel('GrantApplication');
    } else {
      throw {
        code: Response.getErrorCode(),
        message: '未知的审批项目类型',
      }
    }
    if (result === 1) {
      // 同意审批

      if (is_act && foundApprovalFlow.approval_man.user_role.role_slug === 'chile_dept_master') {
        await ProjectModel.update({
          state: 2,
        }, {
          where: {
            id: foundApprovalFlow.approval.project_id,
          }
        });

        // 通知发起人
        await notificationService.sendToPersonal({
          title: '您的审批已经通过!',
          body: foundApprovalFlow.approval.project_subject,
          sender: null,
          items: [
            {
              subject_id: foundApprovalFlow.approval.project_id,
              subject_type: foundApprovalFlow.approval.approval_type,
              is_approval: false,
            }
          ],
          receiver: foundApprovalFlow.approval_man_id,
        });

        return {
          result: 'success',
          approval: foundApprovalFlow.approval,
        };
      }
      if (foundApprovalFlow.approval_man.user_role.role_slug === 'dept_master') {
        await ProjectModel.update({
          state: 2,
        }, {
          where: {
            id: foundApprovalFlow.approval.project_id
          }
        });
        // 通知发起人
        await notificationService.sendToPersonal({
          title: '您的审批已经通过!',
          body: foundApprovalFlow.approval.project_subject,
          sender: null,
          items: [
            {
              subject_id: foundApprovalFlow.approval.project_id,
              subject_type: foundApprovalFlow.approval.approval_type,
              is_approval: false,
            }
          ],
          receiver: foundApprovalFlow.approval_man_id,
        });
        return {
          result: 'success',
          approval: foundApprovalFlow.approval,
        };
      } else {
        const flow = await ApprovalFlows.findOne({
          where: {
            approval_id: approval_id,
            flow_sort: foundApprovalFlow.flow_sort + 1,
          },
          include: [
            {
              model: Approval,
              as: 'approval',
            },
            {
              model: User,
              as: 'approval_man',
              include: {
                model: Role,
                as: 'user_role',
              }
            }
          ]
        });

        // 通知下个审批人
        await notificationService.sendToPersonal({
          title: '您有一条新的审批!',
          body: flow.approval.project_subject,
          sender: null,
          items: [
            {
              subject_id: flow.approval.id,
              subject_type: flow.approval.approval_type,
              is_approval: true,
            }
          ],
          receiver: flow.approval_man_id,
        });

        await ApprovalFlows.update({
          available: 1,
        },{
          where: {
            approval_id: approval_id,
            flow_sort: foundApprovalFlow.flow_sort + 1,
          }
        });
        return {
          result: 'next',
          approval: foundApprovalFlow.approval,
        };
      }
    }

    if (result === 2) {
      // 拒绝审批
      await ProjectModel.update({
        state: 3,
      }, {
        where: {
          id: foundApprovalFlow.approval.project_id
        }
      });

      // 通知审批发起人
      await notificationService.sendToPersonal({
        title: '您的审批被拒绝了!',
        body: foundApprovalFlow.approval.project_subject,
        sender: null,
        items: [
          {
            subject_id: foundApprovalFlow.approval.project_id,
            subject_type: foundApprovalFlow.approval.approval_type,
            is_approval: false,
          }
        ],
        receiver: foundApprovalFlow.approval.publish_id,
      });

      return {
        result: 'refused',
        approval: foundApprovalFlow.approval,
      };
    }
  }
}