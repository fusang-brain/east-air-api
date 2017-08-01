/**
 * Created by alixez on 17-6-12.
 */
import apiConfig from '../config/api';
import jwt from 'jwt-simple';
import url from 'url';
import bcrypt from 'bcrypt-nodejs';
import models from '../models';
import {getSuccessCode, getErrorCode} from '../config/response';

// the private key of jwt
const jwtSecret = apiConfig.jwt.secret;

// the auth funcs
class Auth {

  static jwtEncode(data) {
    return jwt.encode(data, jwtSecret, 'HS256');
  }

  static jwtDecode(token) {
    return jwt.decode(token, jwtSecret, false, 'HS256');
  }

  static getToken(userID, ext = {}) {
    const create_at = new Date().getTime();
    return this.jwtEncode({
      iss: userID,
      create_at: create_at,
      ext,
    });
  }

  static vertifyToken(userID, ext = {}) {

  }

  static async checkAuth(req) {
    const parsed_url = url.parse(req.url, true);
    const token = (req.body && req.body.access_token)
      || parsed_url.query.access_token
      || req.headers["x-access-token"];

    if (!token) {
      throw {
        code: getErrorCode('auth'),
        message: '缺少 access token',
      }
    }
    const decodedToken = Auth.jwtDecode(token);

    // found userinfo through decodedToken;
    const user = await models.User.findOne({
      attributes: {
        exclude: ['password', 'dept', 'role', 'deleted', 'create_at', 'update_at'],
      },
      where: {
        id: decodedToken.iss
      }
    });

    if (!user) {
      throw {
        code: getErrorCode('auth'),
        message: '认证失败, 没有找到该用户',
      }
    }

    req.user = user;

    return true;
  }

  static encodePassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(8), null);
  }

  static validPassword(plainPassword, password) {
    return bcrypt.compareSync(plainPassword, password);
  }
}

export default Auth;