/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */

import GrantApplicationService from '../../service/GrantApplicationService';
import {filterParams} from '../../utils/filters'
export default async function (req, params, {response, checkAccess, services}) {
  await checkAccess('grant_application', 'view');
  const args = filterParams(req.query, {
    search: 'string',
    state: 'string',
    kind: 'string',
  });

  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const grantApplicationService = services.grantApplication;
  const res = await grantApplicationService.generateList({offset, limit, search: args.search, state: args.state, kind: args.kind});

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: res,
  }
}