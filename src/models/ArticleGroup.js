/**
 * Created by alixez on 17-6-15.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('ArticleGroup', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: {type: DataTypes.STRING},
    id_type: {type: DataTypes.STRING, defaultValue: 'common'}, // ID type ['video', 'others', 'common'],
    // video_id: {type: DataTypes.STRING},
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
    update_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
    sort: {type: DataTypes.INTEGER}
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