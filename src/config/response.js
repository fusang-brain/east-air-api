/**
 * Created by alixez on 17-6-15.
 */

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
    default:
      return 2000;
  }
}