/**
 * Copyright(c) omk 2016
 * Filename:
 * Author  : alixez
 */
require('babel-polyfill');
const path = require('path');
const pathFolder = '/file';
const uploadFolder = path.join(__dirname, '/../storage/origin');
const compressFolder = path.join(__dirname, '/../storage/compress');


const environment = {
  development: {
    debug: true,
    isProduction: false,
    aliyun: {
      accessKeyID: 'LTAI3K9kyKhxejXB',
      accessKeySecret: 'vCaMLD2C337CAQa2Esb5w3IYIsKxIv',
    },
    hostname: '172.17.90.93:3000',
    sms: {
      SignName: '东航北分工会',
      TemplateCode: 'SMS_95620114',
      url: 'sapi.253.com/msg/HttpBatchSendSM',
      user: 'huahui-1',
      pwd: 'MhW82916868',
    },
    auth: {
      jwt_secret: 'its-20160612-uibki131-21nhusfd',
      whitelist: [
        '/auth/forget_password',
        '/auth/login',
        '/auth/reset_password',
        '/member/export_xlsx',
        '/export_doc/statistics/relax_action',
        '/export_doc/statistics/sympathy',
        '/sms/send',
        '/vod/export_history',
        '/satisfaction/export_sur',
        '/satisfaction/export_sur/site',
        '/satisfaction/export_sur/person',
        '/vod/video_callback',
        '/upgrade/ios',
        '/upgrade/recent',
        '/upgrade/upload',
        '/upgrade/east',
        '/upgrade/update_ios',
        '/article/details',
      ]
    },
    vod_category: [
      '员工服务',
      '业务',
      '管理',
      '入职指南',
      '综合',
    ],
    redis: {
      password: 'shijijing@123',
      port: 6379,
    },
    storage: {
      pathFolder,
      uploadFolder,
      compressFolder,
      supportFile: {
        'act_image': ['jpg', 'png', 'jpeg'],
        'act_attach': ['pdf'],
        'doc_attach': ['pdf'],
      }
    },
    migrations: {
      super_user: {
        name: 'root',
        mobile: '13100000000',
        nickname: 'root',
      }
    }
  },
  production: {
    debug: false,
    isProduction: true,
    aliyun: {
      // accessKeyID: 'LTAI3K9kyKhxejXB',
      // accessKeySecret: 'vCaMLD2C337CAQa2Esb5w3IYIsKxIv',
      accessKeyID: 'LTAI3K9kyKhxejXB',
      accessKeySecret: 'vCaMLD2C337CAQa2Esb5w3IYIsKxIv',

    },
    hostname: 'gonghuidownload.mubj-fxb.com',
    sms: {
      SignName: '东航北分工会',
      TemplateCode: 'SMS_95620114',
      url: 'sapi.253.com/msg/HttpBatchSendSM',
      user: 'huahui-1',
      pwd: 'MhW82916868',
    },
    auth: {
      jwtSecret: 'its-20160612-uibki131-21nhusfd',
      whitelist: [
        '/auth/forget_password',
        '/auth/login',
        '/auth/reset_password',
        '/member/export_xlsx',
        '/export_doc/statistics/relax_action',
        '/export_doc/statistics/sympathy',
        '/sms/send',
        '/satisfaction/export',
        '/vod/video_callback',
        '/upgrade/ios',
        '/upgrade/recent',
        '/upgrade/upload',
        '/upgrade/east',
        '/upgrade/update_ios',
        '/article/details',
      ]
    },
    vod_category: [
      '员工服务',
      '业务',
      '管理',
      '入职指南',
      '综合',
    ],
    redis: {
      password: 'shijijing@123',
      port: 6379,
    },
    storage: {
      pathFolder,
      uploadFolder,
      compressFolder,
      supportFile: {
        'act_image': ['jpg', 'png', 'jpeg'],
        'act_attach': ['pdf'],
      }
    },
    migrations: {
      super_user: {
        name: 'root',
        mobile: '13100000000',
        nickname: '超级用户',
      }
    }
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Eastern air API',
    description: 'All the modern best practices at here.',
    head: {
      titleTemplate: 'Eastern air: %s',
      meta: [
        {name: 'description', content: 'All the modern best practices at here.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Eastern air'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Eastern air'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    },
  },
}, environment);