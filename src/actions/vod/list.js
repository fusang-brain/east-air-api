/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/28
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services}) => {
  const args = filterParams(req.query, {
    offset: 'string',
    limit: 'string',
    vod_type: 'string',
    category: 'string',
  });

  args.offset = parseInt(args.offset || 0);
  args.limit = parseInt(args.limit || 20);
  const filter = {};
  args.vod_type && (filter.vodType = args.vod_type);
  args.category && (filter.category = args.category);

  const {list, total} = await services.vod.list({
    limit: args.limit,
    offset: args.offset,
    filter: filter,
  });

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      total,
      list,
    }
  }
}