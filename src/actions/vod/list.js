/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/28
 */
import { filterParams } from '../../utils/filters'

// 获取视频列表
export default async (req, params, {response, services}) => {
  const args = filterParams(req.query, {
    offset: 'string',
    limit: 'string',
    vod_type: 'string',
    category: 'string',
    title: 'string',
    search: 'string',
  });

  args.offset = parseInt(args.offset || 0);
  args.limit = parseInt(args.limit || 20);
  const filter = {};
  args.vod_type && (filter.vodType = args.vod_type);
  args.category && (filter.category = args.category);
  args.title && (filter.title = args.title);
  args.search && (filter.title = args.search);

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