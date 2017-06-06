import path from 'path';
const uploadFolder = path.join(__dirname, '../uploads');
export default {
  // DB to mongoose
  mongoose: {
    db: 'mongodb://localhost/eastern-air',
  },
  meta: {
    installed: 'eastern.installed',
  },
  uploadFolder,
}