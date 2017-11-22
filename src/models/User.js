/**
 * Created by alixez on 17-6-6.
 */
import {generateNo} from '../utils/utils';
export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    serial_no: {type: DataTypes.STRING, defaultValue: generateNo},
    name: {type: DataTypes.STRING, allowNull: false},
    no: {type: DataTypes.STRING, allowNull: false, defaultValue: '0'},  // 卡号ß
    birthday: {type: DataTypes.BIGINT, allowNull: false},                // 时间毫秒数
    card_num: {type: DataTypes.STRING, allowNull: false},                // 身份证号
    mobile: {type: DataTypes.STRING, length: 11, unique: true},
    // nickname: {type: DataTypes.STRING, defaultValue: ''},
    type: {type: DataTypes.INTEGER, defaultValue: 0},                    // 用工性质 enum 0: 合同制 1: 劳务制
    ehr: {type: DataTypes.STRING, defaultValue: ''},
    password: {type: DataTypes.STRING},
    state: {type: DataTypes.INTEGER, defaultValue: 0},                   // 状态 1: 在职, 2: 离职,3: 退休, 0:其他
    other_status: {type: DataTypes.INTEGER, defaultValue: 0},            // 其他状态 0: 正常, 1: 困难
    gender: {type: DataTypes.INTEGER, defaultValue: 0},                  // 0: 未知 1:女 2:男
    qq: {type: DataTypes.STRING, defaultValue: ''},                      // qq
    wechat: {type: DataTypes.STRING, defaultValue: ''},                  // 微信
    degree: {type: DataTypes.INTEGER, defaultValue: 0},                  // 学位 enum 0: 未知 1:专科 2:本科 3:硕士 4:博士
    duties: {type: DataTypes.STRING, defaultValue: ''},                  // 职称
    jobs: {type: DataTypes.STRING, defaultValue: ''},                    // 岗位
    exist_job_level: {type: DataTypes.STRING, defaultValue: ''},         // 实设岗级
    now_job_level: {type: DataTypes.STRING, defaultValue: ''},           // 现岗级
    start_work_time: {type: DataTypes.STRING},                           // 参加工作时间
    join_time: {type: DataTypes.STRING},                                 // 入职时间

    mark: {type: DataTypes.STRING, defaultValue: ''},                    // 备注
    avatar: {type: DataTypes.STRING, defaultValue: ''},                  // 头像地址

    // province: {type: DataTypes.INTEGER, defaultValue: 0},
    // city: {type: DataTypes.INTEGER, defaultValue: 0},
    // type: {type: DataTypes.STRING},

    integration: {type: DataTypes.INTEGER, defaultValue: 0},             // 用户积分
    quit_time: {type: DataTypes.STRING},                                 // 离职时间
    retire_time: {type: DataTypes.STRING},                               // 退休时间

    dept: {type: DataTypes.UUID, references: null},              // 所属部门 外键
    role: {type: DataTypes.UUID, references: null},              // 角色

    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: Date.now},
    update_at: {type: DataTypes.STRING, defaultValue: Date.now},
  }, {
    defaultScope: {
      where: {
        deleted: false,
      },
      attributes: {
        exclude: ['password', 'deleted']
      }
    },
    scopes: {
      with_password: {
        attributes: {
          exclude: ['deleted']
        },
        where: {
          deleted: false,
        }
      }
    },
    classMethods: {
      associate(models) {
        this.belongsTo(models.Role, {
          as: 'user_role',
          foreignKey: 'role',
          sourceKey: 'id',
          onDelete: 'cascade',
        });
        this.belongsTo(models.Dept, {as: 'department', foreignKey: 'dept', sourceKey: 'id', onDelete: 'cascade'});
        this.belongsToMany(models.Dept, {
          as: 'data_access',
          through: {
            model: models.DataAccess,
            as: 'user_data_access',
            unique: false,
          }
        });
      }
    }
  });

  return User;
}
