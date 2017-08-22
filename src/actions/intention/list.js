/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/22
 */
import {filterParams} from '../../utils/filters'

export default async (req, params, {response, services}) => {
  const args = filterParams(req.query, {
    limit: 'string',
    offset: 'string',
    search: 'string',
    sort: 'string',
  });

  args.limit = +args.limit || 20;
  args.offset = +args.offset || 0;
  args.sort = +args.sort || 1;

  console.log(args, 'args ===');

  const {list, total} = await services.intention.generateList(args);

  return {
    code: response.getSuccessCode(),
    message: '获取列表成功',
    data: {
      total,
      list,
    }
  }
}