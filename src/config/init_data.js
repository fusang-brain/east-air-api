/**
 * Created by alixez on 17-6-21.
 */
import Auth from '../utils/auth';

const permissions = [
  {
    name: '活动列表',
    slug: 'activity_list',
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
        name: '打印二维码',
        slug: 'print_qcode',
      },
      {
        name: '数据统计',
        slug: 'data_statistics',
      },
    ]
  },
  {
    name: '疗养休',
    slug: 'recuperation',
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
    slug: 'condolences',
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
    slug: 'organization_structure',
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
    slug: 'funding_applications',
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
    slug: 'funding_approval',
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
    name: '积分兑换',
    slug: 'redeem_integration',
    permission: [
      {
        name: '兑换商品',
        slug: 'redeem_goods',
      },
      {
        name: '查看积分详情',
        slug: 'view_integration_detail',
      },
      {
        name: '上架积分商品',
        slug: 'publish_goods',
      },
      {
        name: '移除积分商品',
        slug: 'remove_goods',
      },
      {
        name: '下架积分商品',
        slug: 'stop_goods',
      },
      {
        name: '新增积分商品',
        slug: 'create_goods',
      },
      {
        name: '查看兑换明细',
        slug: 'view_redeem_detail',
      },
      {
        name: '确认商品兑换',
        slug: 'confirm_redeem',
      },
    ]
  },
];

const sysuser = {
  name: '用户_'+ Math.round(Math.random() * 10000),
  mobile: '15500000000',
  nickname: '隔壁老王',
  birthday: new Date().getTime(),
  card_num: '--',
  password: Auth.encodePassword('05B530AD0FB56286FE051D5F8BE5B8453F1CD93F') // 88888888
};

const roles = [
  {
    role_name: '工会主席',
    role_description: '工会主席描述',
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
            name: '飞行部分会1',
            children: [
              {name: '三级分类1'}
            ]
          },
          {
            name: '飞行部分会2',
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

export {permissions, dept, sysuser, roles};