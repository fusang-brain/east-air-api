/**
 * Created by alixez on 17-6-6.
 */
import path from 'path';
const uploadFolder = path.join(__dirname, '../uploads');

export default {
  // The config of db
  db: {
    mongodb: 'mongodb://localhost/eastern-air',
    mysql: '',
  },

  uploadFolder,
}