/**
 * Created by alixez on 17-6-15.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('Article', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    title: {type: DataTypes.STRING},
    category: {type: DataTypes.UUID},
    group_id: {type: DataTypes.UUID},
    description: {type: DataTypes.STRING},
    content: {type: DataTypes.TEXT},
    covers: {type: DataTypes.TEXT}, // 封面数组
    // video_id: {type: DataTypes.STRING},
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: Date.now},
    update_at: {type: DataTypes.STRING, defaultValue: Date.now},
    is_top: {type: DataTypes.BOOLEAN, defaultValue: false},
    is_read: {type: DataTypes.BOOLEAN, defaultValue: false},
    publisher: {type: DataTypes.UUID},
  }, {
    getterMethods: {
      coverList() {
        if (!this.covers) {
          return [];
        }
        
        return JSON.parse(this.covers) || [];
      }
    },
    defaultScope: {
      attributes: {
        exclude: ['deleted']
      },
      // order: [
      //   ['update_at', 'desc'],
      //   ['create_at', 'desc'],
      // ]
    },
    scopes: {
      list: {
        where: {
          deleted: false,
        },
        attributes: {
          exclude: ['deleted']
        },
        // order: [
        //   ['update_at', 'desc'],
        //   ['create_at', 'desc'],
        // ]
      }
    },
    classMethods: {
      associate(models) {
        //Dept.belongsTo(models.Dept, {as: 'parent', foreignKey: 'parent', sourceKey: 'id'});
        this.belongsToMany(models.Video, {
          as: 'videos',
          through: {
            model: models.ArticleVideo,
            unique: false,
          },
          foreignKey: 'article_id',
        });

        this.belongsTo(models.User, {as: 'publisherObject', foreignKey: 'publisher', sourceKey: 'id'});
        this.belongsTo(models.ArticleCategory, {as: 'cate', foreignKey: 'category', sourceKey: 'id'});
        this.belongsTo(models.ArticleGroup, {as: 'group', foreignKey: 'group_id', sourceKey: 'id'});
      }
    }
  });
}