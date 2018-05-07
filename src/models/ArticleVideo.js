import {generateNo} from '../utils/utils';
export default function (sequelize, DataTypes) {
  return sequelize.define('ArticleVideo', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    article_id: {type: DataTypes.UUID},
    video_id: {type: DataTypes.STRING}
  });
}