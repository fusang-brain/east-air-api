/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/16
 */

// 公文表
export default function (sequelize, DataTypes) {
  return sequelize.define('Docs', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    user_id: {type: DataTypes.UUID},      // 发送人ID
    doc_title: {type: DataTypes.STRING},
    doc_type: {type: DataTypes.STRING},   // 0:未知 1:上级来文 2:股份文件 3:集团文件 4:分公司文件 5:公文批复 6:其他
    doc_level: {type: DataTypes.STRING},  // general:一般 important:重要 crash:紧急 top_secret:绝密
    doc_note: {type: DataTypes.STRING},
    create_time: {type: DataTypes.STRING, defaultValue: Date.now},
  }, {
    classMethods: {
      associate(models) {
        this.hasMany(models.DocAttach, {
          as: 'attach',
          foreignKey: 'doc_id',
          sourceKey: 'id',
        });

        this.hasMany(models.DocReceivers, {
          as: 'receivers',
          foreignKey: 'doc_id',
          sourceKey: 'id',
        });

        this.belongsTo(models.User, {
          as: 'publisher',
          foreignKey: 'user_id',
          sourceKey: 'id',
          onDelete: 'cascade',
        })
      }
    }
  });
}