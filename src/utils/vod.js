/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */

import querystring from 'querystring';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';
import axios from 'axios';
import uuid from 'uuid/v4';
import Response from '../config/response'

export class ALIYunAPI {

  constructor({signature, accessKeyID, accessKeySecret, signatureMethod, signatureVersion, signatureNonce, version}) {
    this.host = 'vod.cn-shanghai.aliyuncs.com';
    this.format = 'JSON';
    this.version = version || '2017-03-21';
    this.accessKeyID = accessKeyID;
    this.accessKeySecret = accessKeySecret;
    this.signature = signature;
    this.signatureMethod = signatureMethod || 'HMAC-SHA1';
    this.timestamp = null;
    this.signatureVersion = signatureVersion || '1.0';
    this.signatureNonce = signatureNonce;
  }

  setSignatureConfig({signatureNonce, signatureVersion, signatureMethod}) {
    this.signatureNonce = signatureNonce;
    this.signatureVersion = signatureVersion;
    this.signatureMethod = signatureMethod;

    return this;
  }

  __initialTimestamp() {

    this.timestamp = new Date(+Date.now()).toISOString();
  }

  __generateSignature(params, httpMethod) {
    delete params.Signature;

    let canonicalizedQueryString = this.__queryToSortedString(params);
    canonicalizedQueryString = canonicalizedQueryString.replace(/\*/, '%2A').replace(/%7E/, '~').replace('/\+/', '%20');
    // console.log(canonicalizedQueryString, '标准化的querystring');
    const stringToSign = httpMethod + "&" + encodeURIComponent('/') + "&" + encodeURIComponent(canonicalizedQueryString);
    // console.log(stringToSign, '签名字符串');
    let signature = Base64.stringify(hmacSHA1(stringToSign, this.accessKeySecret + "&"));
    // signature = signature.replace(/\*/, '%2A').replace(/%7E/, '~').replace(/\+/, '%20');
    return signature;
  }

  __queryToSortedString(params) {
    let keys = Object.keys(params);
    const sorted = [];

    keys = keys.sort();
    for (let i = 0; i < keys.length; i ++) {
      let key = keys[i];
      if (!params[key]) {
        continue;
      }
      sorted.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    }

    return sorted.join('&');
  }

  __getCommonParams() {

    // if (!this.signatureNonce) {
    this.signatureNonce = uuid();
    // }
    return {
      Format: this.format,
      Version: this.version,
      AccessKeyId: this.accessKeyID,
      Signature: this.signature,
      SignatureMethod: this.signatureMethod,
      Timestamp: this.timestamp,
      SignatureVersion: this.signatureVersion,
      SignatureNonce: this.signatureNonce,
    }
  }

  async refreshUploadVideo({videoID}) {
    this.__initialTimestamp();
    const queryParams = {
      VideoId: videoID,
      Action: 'RefreshUploadVideo',
      ...this.__getCommonParams(),
    }

    queryParams.Signature = this.__generateSignature(queryParams, 'GET');

    const url = `http://${this.host}?${querystring.stringify(queryParams)}`;

    try {
      const resp = await axios.get(url);

      if (resp.status / 100 === 2) {
        return resp.data;
      }
    } catch (err) {
      throw {
        code: Response.getErrorCode(),
        message: err.response.data.Message,
      }
    }

    return false;
  }

  async createUploadVideo({title, filename, filesize, description}) {
    this.__initialTimestamp();
    const queryParams = {
      Title: title,
      FileName: filename,
      FileSize: filesize,
      Description: description,
      ...this.__getCommonParams(),
    }

    if (!description) {
      delete queryParams.Description;
    }

    queryParams.Action = 'CreateUploadVideo';
    queryParams.Signature = this.__generateSignature(queryParams, 'GET');

    const url = `http://${this.host}?${querystring.stringify(queryParams)}`;

    try {
      const resp = await axios.get(url);

      if (resp.status / 100 === 2) {
        return resp.data;
      }
    } catch (err) {
      throw {
        code: Response.getErrorCode(),
        message: err.response.data.Message,
      }
    }


    return false;
  }

  async getPlayInfo(videoID, authTimeout=3600, formats='mp4', streamType = 'video') {
    this.__initialTimestamp();

    let _formats = 'mp4';

    if (typeof formats === 'string') {
      _formats = formats;
    }

    if (Array.isArray(formats)) {
      _formats = formats.join(',');
    }

    const queryParams = {
      Action: 'GetPlayInfo',
      VideoId: videoID,
      Formats: _formats,
      AuthTimeout: authTimeout,
      StreamType: streamType,
      ...this.__getCommonParams(),
    };

    queryParams.Signature = this.__generateSignature(queryParams, 'GET');
    const url = `http://${this.host}?${querystring.stringify(queryParams)}`;
    try {
      const resp = await axios.get(url);

      if (resp.status / 100 === 2) {
        return resp.data;
      }
    } catch (err) {
      // console.log(err);
      throw {
        code: Response.getErrorCode(),
        message: err.response.data.Message,
      }
    }

    return false;
  }

}