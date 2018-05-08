/**
 * Created by alixez on 17-6-15.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('Video', {
    id: {type: DataTypes.STRING, primaryKey: true},
    // video: {type: }
    // video_kind: {type: DataTypes.INTEGER, defaultValue: 0}, // 0: 视频 1: 音频
    cover_url: {type: DataTypes.STRING}, // 封面路径
    file_url: {type: DataTypes.STRING}, // 文件地址
    duration: {type: DataTypes.STRING, defaultValue: '0'},   // 视频长度
    finished: {type: DataTypes.BOOLEAN, defaultValue: false}, // 是否转码完成
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
    update_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
  }, {
    defaultScope: {
      attributes: {
        exclude: ['deleted', 'update_at', 'create_at']
      },
    },
    scopes: {
      list: {
        where: {
          deleted: false,
        },
        attributes: {
          exclude: ['deleted', 'update_at', 'create_at']
        },
      }
    },
    classMethods: {
      associate(models) {
      }
    }
  });
}