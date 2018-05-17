/**
 * Created by alixez on 17-6-15.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('ArticleLastRead', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    user_id: {type: DataTypes.UUID},
    time: {type: DataTypes.STRING},
  });
}