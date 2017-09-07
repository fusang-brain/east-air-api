/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */

import redis from 'redis';
import axios from 'axios';
import config from '../config';
import bluebird from 'bluebird';
import Response from '../config/response'

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient();

export function generateVerifyCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

export async function sendCode(mobile) {
  const countKey = mobile + 'countInOneMinute';
  const valueOfCountKey = await redisClient.getAsync(countKey);
  if (valueOfCountKey > 3) {
    throw {
      code: Response.getErrorCode(),
      message: '您发送短信过于频繁，一分钟内最多可发3条',
    }
  }

  redisClient.set(countKey, valueOfCountKey + 1, 'EX', 60);

  const code = generateVerifyCode();

  redisClient.set(mobile, code, 'EX', 5 * 60);
  const msgContent = `【蜜蜂网】东航工会密码修改验证码：${code}`;

  // todo Send SMS
  const sendResp = await axios
    .get(`http://${config.sms.url}?account=${config.sms.user}&pswd=${config.sms.pwd}&msg=${msgContent}&mobile=${mobile}&needstatus=false`);

  if (config.debug) {
    return code;
  }

  return true;
}

export async function verifyCode(mobile, code) {

  if (config.debug && code === '8888') {
    return true;
  }
  const codeOfMobile = await redisClient.getAsync(mobile);

  if (!codeOfMobile) {
    throw {
      code: Response.getErrorCode(),
      message: '验证码不存在',
    }
  }

  return +codeOfMobile === +code;
}