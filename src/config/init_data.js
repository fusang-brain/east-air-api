/**
 * Created by alixez on 17-6-21.
 */
import Auth from '../utils/auth';
import path from 'path';

const permissions = [
  {
    name: '活动列表',
    slug: 'activity',
    permission: [
      {
        name: '发起活动',
        slug: 'create',
      },
      {
        name: '编辑草稿',
        slug: 'edit',
      },
      {
        name: '删除活动',
        slug: 'remove',
      },
      {
        name: '查看活动',
        slug: 'view',
      },
      {
        name: '活动签到',
        slug: 'sign',
      },
      {
        name: '活动评价',
        slug: 'comment_activity',
      },
    ]
  },
  {
    name: '会员管理',
    slug: 'member',
    permission: [
      {
        name: '查看会员',
        slug: 'view',
      },
      {
        name: '新增会员',
        slug: 'create',
      },
      {
        name: '编辑会员',
        slug: 'edit',
      },
      {
        name: '标记困难',
        slug: 'mark_difficult',
      },
      {
        name: '标记离退',
        slug: 'mark_retirement',
      },
    ]
  },
  {
    name: '意见征集',
    slug: 'opinion_collection',
    permission: [
      {
        name: '发起征集',
        slug: 'start',
      },
      {
        name: '支持投票',
        slug: 'vote',
      },
      {
        name: '发起活动',
        slug: 'post_activity',
      },
      {
        name: '终止征集',
        slug: 'stop',
      },
    ]
  },
  {
    name: '满意度调查',
    slug: 'satisfaction_degree_investigation',
    permission: [
      {
        name: '创建',
        slug: 'create',
      },
      {
        name: '打印二维码',
        slug: 'print_qcode',
      },
      {
        name: '数据统计',
        slug: 'data_statistics',
      },
      {
        name: '参与投票',
        slug: 'vote',
      }
    ]
  },
  {
    name: '疗养休',
    slug: 'relax_action',
    permission: [
      {
        name: '发起/组织',
        slug: 'start',
      },
      {
        name: '编辑草稿',
        slug: 'edit',
      },
      {
        name: '查看',
        slug: 'view',
      },
      {
        name: '统计',
        slug: 'statistics',
      },
    ]
  },
  {
    name: '慰问',
    slug: 'sympathy',
    permission: [
      {
        name: '发起慰问',
        slug: 'start',
      },
      {
        name: '编辑草稿',
        slug: 'edit',
      },
      {
        name: '删除慰问',
        slug: 'remove',
      },
      {
        name: '查看慰问',
        slug: 'view',
      },
      {
        name: '统计',
        slug: 'statistics',
      }

    ]
  },
  {
    name: '组织架构',
    slug: 'dept',
    permission: [
      {
        name: '新增部门',
        slug: 'create',
      },
      {
        name: '编辑部门',
        slug: 'edit',
      },
      {
        name: '删除部门',
        slug: 'remove',
      },
    ]
  },
  {
    name: '角色权限',
    slug: 'role_permission',
    permission: [
      {
        name: '新增角色',
        slug: 'create',
      },
      {
        name: '编辑角色',
        slug: 'edit',
      },
      {
        name: '删除角色',
        slug: 'remove',
      },
    ]
  },
  {
    name: '经费申请',
    slug: 'grant_application',
    permission: [
      {
        name: '填写申请',
        slug: 'create',
      },
      {
        name: '编辑申请',
        slug: 'edit',
      },
      {
        name: '删除申请',
        slug: 'remove',
      },
      {
        name: '查看申请',
        slug: 'view',
      },
    ]
  },
  {
    name: '经费审批',
    slug: 'grant_approval',
    permission: [
      {
        name: '活动经费',
        slug: 'activity_funding',
      },
      {
        name: '经费审批',
        slug: 'apply_funding',
      },
    ]
  },
  {
    name: '公文管理',
    slug: 'document_manage',
    permission: [
      {
        name: '编辑公文',
        slug: 'edit',
      },
      {
        name: '下发公文',
        slug: 'publish',
      },
      {
        name: '查看公文',
        slug: 'view',
      },
      {
        name: '一键提醒',
        slug: 'reminder',
      },
    ]
  },
  {
    name: '技能培训',
    slug: 'skill_training',
    permission: [
      {
        name: '新增',
        slug: 'create',
      },
      {
        name: 'export',
        slug: '导出',
      },
      {
        name: '编辑',
        slug: 'edit',
      },
      {
        name: '删除',
        slug: 'delete',
      }
    ]
  },
  {
    name: '代办事项',
    slug: 'todo_list',
    permission: [
      {
        name: '查看',
        slug: 'view',
      }
    ]
  }
  // {
  //   name: '积分兑换',
  //   slug: 'redeem_integration',
  //   permission: [
  //     {
  //       name: '兑换商品',
  //       slug: 'redeem_goods',
  //     },
  //     {
  //       name: '查看积分详情',
  //       slug: 'view_integration_detail',
  //     },
  //     {
  //       name: '上架积分商品',
  //       slug: 'publish_goods',
  //     },
  //     {
  //       name: '移除积分商品',
  //       slug: 'remove_goods',
  //     },
  //     {
  //       name: '下架积分商品',
  //       slug: 'stop_goods',
  //     },
  //     {
  //       name: '新增积分商品',
  //       slug: 'create_goods',
  //     },
  //     {
  //       name: '查看兑换明细',
  //       slug: 'view_redeem_detail',
  //     },
  //     {
  //       name: '确认商品兑换',
  //       slug: 'confirm_redeem',
  //     },
  //   ]
  // },
];

function generateRandomString() {
  return Math.round(Math.random() * 10000);
}

const sysuser = {
  name: '用户_'+ generateRandomString(),
  mobile: '15500000000',
  gender: 1,
  state: 1,
  nickname: '隔壁老王',
  birthday: new Date().getTime(),
  card_num: '--',
  password: Auth.encodePassword('05B530AD0FB56286FE051D5F8BE5B8453F1CD93F') // 88888888
};

const roles = [
  {
    role_name: '超级管理员',
    role_slug: 'root',
    role_description: '超级管理员',
    is_master: false,
    available: false,
  },
  {
    role_name: '工会主席',
    role_slug: 'dept_master',
    role_description: '工会主席描述',
    is_master: true,
    available: true,
  },
  {
    role_name: '分工会主席',
    role_slug: 'chile_dept_master',
    role_description: '分工会主席描述',
    is_master: true,
    available: true,
  },
  {
    role_name: '工会财务',
    role_slug: 'dept_finance',
    is_master: true,
    available: true,
  },
  {
    role_name: '工会主任',
    role_slug: 'dept_director',
    is_master: true,
    available: true,
  },
  {
    role_name: '普通会员',
    role_slug: 'common_member',
    is_master: false,
    available: true,
  }
];

const dept = [
  {
    name: '东方航空北京分公司工会',
    children: [
      {
        name: '飞行部分会',
        children: [
          {
            name: '部门1',
          },
          {
            name: '部门2',
          }
        ]
      },
      {
        name: '地服部分会',
      },
      {
        name: '客舱部分会',
      },
      {
        name: '运控部分会'
      },
      {
        name: '货运部分会',
      },
      {
        name: '机关分会',
      }
    ]
  }
];

const SatisfactionSurvey = [
  {
    id: 'default.survey.canteen',
    survey_type: 1,
    survey_subject: '机关食堂',
    is_system_survey: true,
    state: 1,
  },
  {
    id: 'default.survey.office',
    survey_type: 1,
    survey_subject: '员工免优票',
    is_system_survey: true,
    state: 1,
  },
  {
    id: 'default.survey.service_center',
    survey_type: 1,
    survey_subject: '职工服务中心',
    is_system_survey: true,
    state: 1,
  }
];

const SurveyImages = [
  {
    survey_id: 'default.survey.canteen',
    file_id: 'default.satisfaction.canteen',
    file_path: path.join('/file', 'EasternDefaultCanteen.png'),
    size: 0,
  },{
    survey_id: 'default.survey.office',
    file_id: 'default.satisfaction.office',
    file_path: path.join('/file', 'EasternDefaultOffice.png'),
    size: 0,
  },{
    survey_id: 'default.survey.service_center',
    file_id: 'default.satisfaction.service_center',
    file_path: path.join('/file', 'EasternDefaultServiceCenter.png'),
    size: 0,
  }
]

const defaultImage = [
  {
    id: 'default.satisfaction.canteen',
    abs_path: path.join(__dirname, '/../storage/origin', 'EasternDefaultCanteen.png'),
    path: path.join('/file', 'EasternDefaultCanteen.png'),
    size: 0,
    mimetype: 'image/png',
    filename: 'EasternDefaultCanteen.png',
  },{
    id: 'default.satisfaction.office',
    abs_path: path.join(__dirname, '/../storage/origin', 'EasternDefaultOffice.png'),
    path: path.join('/file', 'EasternDefaultOffice.png'),
    size: 0,
    mimetype: 'image/png',
    filename: 'EasternDefaultOffice.png',
  },{
    id: 'default.satisfaction.service_center',
    abs_path: path.join(__dirname, '/../storage/origin', 'EasternDefaultServiceCenter.png'),
    path: path.join('/file', 'EasternDefaultServiceCenter.png'),
    size: 0,
    mimetype: 'image/png',
    filename: 'EasternDefaultServiceCenter.png',
  }
]

function getMasterRole() {
  return roles.filter(loop => {
    return loop.is_master;
  })
}

export {permissions, dept, sysuser, roles, getMasterRole, defaultImage, SatisfactionSurvey, SurveyImages};