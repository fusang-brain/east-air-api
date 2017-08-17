/**
 * Created by alixez on 17-6-15.
 */

class Response {

  static successResp(message, action='', data) {
    return {
      code: this.getSuccessCode(action),
      message,
      data,
    }
  }

  static errorResp(message, action='', data) {
    return {
      code: this.getErrorCode(action),
      message,
      data,
    }
  }

  static getSuccessCode(action='') {
    switch (action) {
      case 'update':
        return 1001;
      case 'delete':
        return 1002;
      case 'remove':
        return 1003;
      case 'insert':
        return 1004;
      default:
        return 1000;
    }
  }

  static getErrorCode(action='') {
    switch (action) {
      case 'update':
        return 2001;
      case 'delete':
        return 2002;
      case 'remove':
        return 2003;
      case 'insert':
        return 2004;
      case 'auth':
        return 2005;
      default:
        return 2000;
    }
  }
}

export default Response;

export function getSuccessCode(action='') {
  switch (action) {
    case 'update':
      return 1001;
    case 'delete':
      return 1002;
    case 'remove':
      return 1003;
    case 'insert':
      return 1004;
    default:
      return 1000;
  }
}

export function getErrorCode(action='') {
  switch (action) {
    case 'update':
      return 2001;
    case 'delete':
      return 2002;
    case 'remove':
      return 2003;
    case 'insert':
      return 2004;
    case 'auth':
      return 2005;
    case 'access':
      return 2006;
    default:
      return 2000;
  }
}