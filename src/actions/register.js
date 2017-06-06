/**
 * Copyright(c) omk 2016
 * Filename:
 * Author  : alixez
 */

import mongoose from 'mongoose';
import { getApiErrorsAsync } from '../utils/errors';
const UserModel = mongoose.model('User');

export default async function register(req) {
  return new Promise((resolve, reject) => {
    // console.log(req, '=========');
    const args = req.body;
    console.log(args);
    const user = new UserModel(args);
    user.save(async (error, doc) => {
      if (error) {
        // console.log(error.errors);
        const apiErr = await getApiErrorsAsync('register', '注册信息保存失败', error.errors);
        reject(apiErr);
      } else {
        resolve({
          msg: '保存成功',
          data: doc,
        });
      }
    });

  });
}