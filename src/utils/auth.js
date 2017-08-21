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
        exclude: ['password', 'deleted', 'create_at', 'update_at'],
      },
      include: [
        {
          model: models.Dept,
          as: 'data_access',
        },
        {
          model: models.Role,
          as: 'user_role',
          include: [
            {
              model: models.Permission,
              as: 'permissions',
            },

          ]
        },

      ],
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
    const originDataAccess = user.data_access;
    const originPermissions = user.user_role.permissions;
    let permissions = originPermissions.map(permission => ({
      permission_id: permission.id,
      module: permission.module_slug,
      action: permission.slug,
      action_name: permission.name,
      platform: permission.RolePermission.platform,
    }));
    let dataAccess = originDataAccess.map(dataAccess => dataAccess.id);
    user.user_role.setDataValue('permissions', undefined);
    user.setDataValue('data_access', undefined);
    if (user.user_role.role_slug === 'root') {
      const depts = await models.Dept.all({
        where: {
          tree_level: 3,
        }
      });

      dataAccess = depts.map(value => value.id);
    }
    req.user = user;
    req.permissions = permissions;
    req.dataAccess = dataAccess;
    return true;
  }

  static async checkAccess(req, module, action, platform='pc', throwError=true) {
    const originPermissions = req.permissions;
    if (platform === 'pc') {
      platform = 'web';
    }

    return true;

    if (req.user.user_role.role_slug === 'root') {
      return true;
    }

    const foundPermission = originPermissions.find((permission) => {
      return permission.module === module && permission.action === action && permission.platform === platform;
    });

    if (!foundPermission) {
      if (!throwError) {
        return false;
      }
      throw {
        code: getErrorCode('access'),
        message: '您没有此操作的权限',
      }
    }

    return foundPermission;
  }

  static encodePassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(8), null);
  }

  static validPassword(plainPassword, password) {
    return bcrypt.compareSync(plainPassword, password);
  }
}

export default Auth;