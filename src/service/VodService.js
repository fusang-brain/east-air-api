/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */
import Service from './Service'
import { filterParams } from '../utils/filters'

export default class VodService extends Service {

  static CREATE_LEVEL_FIRST = 'create.level.first';
  static CREATE_LEVEL_FULL = 'create.level.second';
  constructor () {
    super();
    this.modelName = 'Vod';
  }

  async create(args, level) {

    if (level === 'create.level.first') {
      delete args.cover_id;
      args.enable = false;
    } else {
      args.enable = true;
    }

    const foundVOD = await this.getModel('Vod').findOne({
      where: {
        aliyun_video_id: args.aliyun_video_id,
      }
    });

    if (foundVOD) {
      const {aliyun_video_id, ...values} = args;
      await this.getModel('Vod').update(values, {
        where: {
          id: foundVOD.id,
        }
      });

      return await this.getModel('Vod').findOne({
        where: {
          id: foundVOD.id,
        }
      });
    }

    return await this.getModel('Vod').create(args);
  }


}