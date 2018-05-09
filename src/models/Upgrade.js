/**
 * Created by alixez on 17-6-15.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('Upgrade', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    // video: {type: }
    // video_kind: {type: DataTypes.INTEGER, defaultValue: 0}, // 0: 视频 1: 音频
    kind: {type: DataTypes.STRING},
    version: {type: DataTypes.STRING}, // 封面路径
    filename: {type: DataTypes.STRING}, // 文件地址
    // ipa_filename: {type: DataTypes.STRING, defaultValue: '0'},   // 视频长度
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
    update_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
  }, {
    defaultScope: {
      attributes: {
        exclude: ['deleted']
      },
    },
    scopes: {
      list: {
        where: {
          deleted: false,
        },
        attributes: {
          exclude: ['deleted']
        },
      }
    },
    classMethods: {
      associate(models) {
      }
    }
  });
}