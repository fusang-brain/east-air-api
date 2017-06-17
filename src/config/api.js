/**
 * Created by alixez on 17-6-7.
 */
import path from 'path';
const uploadFolder = path.join(__dirname, '../uploads');

export default {
  // The config of db
  sequelize: {
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
      charset: 'utf8mb4'
    },
    define: {
      underscored: true,
      paranoid: true,
    }
  },

  jwt: {
    secret: 'its-20160612-uibki131-21nhusfd',

  },

  db: {
    mongodb: 'mongodb://localhost/eastern-air',
    mysql: 'mysql://root:root@localhost:3306/eastern_air'
    // sequelize: {
    //   database: '',
    //   username: '',
    //   password: '',
    //   options: {
    //     host: 'localhost',
    //     dialect: 'mysql',
    //     pool: {
    //       max: 5,
    //       min: 0,
    //       idle: 10000
    //     },
    //   }
    // },
  },

  uploadFolder,
}