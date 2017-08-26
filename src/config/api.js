/**
 * Created by alixez on 17-6-7.
 */
import path from 'path';
const uploadFolder = path.join(__dirname, '../uploads');

export default {

  jwt: {
    secret: 'its-20160612-uibki131-21nhusfd',
  },

  debug: true,

  uploadFolder,
}
