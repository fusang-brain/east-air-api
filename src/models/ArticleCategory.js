/**
 * Created by alixez on 17-6-15.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('ArticleCategory', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: {type: DataTypes.STRING},
    group: {type: DataTypes.STRING}, // 分类分组
    // video_id: {type: DataTypes.STRING},
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: Date.now},
    update_at: {type: DataTypes.STRING, defaultValue: Date.now},
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
  });
}