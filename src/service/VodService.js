/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */
import Service from './Service';
import { filterParams } from '../utils/filters';
import Response from '../config/response';
import {ALIYunAPI} from '../utils/vod';
import config from '../config';

const vodApi = new ALIYunAPI({
  accessKeyID: config.aliyun.accessKeyID,
  accessKeySecret: config.aliyun.accessKeySecret,
});

export default class VodService extends Service {

  static CREATE_LEVEL_FIRST = 'create.level.first';
  static CREATE_LEVEL_FULL = 'create.level.second';
  constructor () {
    super();
    this.modelName = 'Vod';
  }

  async update(id, values) {
    await this.getModel('Vod').update(values, {
      where: {
        id,
      }
    });

    return true;
  }

  async updateDuration(id, duration) {
    await this.getModel('Vod').update({
      duration,
    }, {
      where: {
        id: id,
      }
    });

    return true;
  }

  async finishedVideo(id, { cover, fileUrl, duration, definition, format }) {
    const VideoModel = this.getModel("Video");
    const VodModel = this.getModel('Vod');
    
    const foundVideo = await VideoModel.findOne({
      where: { id },
    });

    if (fileUrl) {
      if (!foundVideo.file_url) {
        foundVideo.file_url = fileUrl;
        duration && (foundVideo.duration = duration);
      } else {
        if (String(format) === 'm3u8' && 'LD' === String(definition)) {
          foundVideo.file_url = fileUrl;
          duration && (foundVideo.duration = duration);
        }
      }
    }

    
    
    // foundVideo.finished = true;
    // if (!foundVideo.file_url || ['FD', 'LD'].includes(definition)) {
    //   foundVideo.file_url = fileUrl;
    // }

    // kind && (foundVideo.video_kind = kind);
    cover && (foundVideo.cover_url = cover);
    if (foundVideo.cover_url && foundVideo.file_url) {
      foundVideo.finished = true;
    }
    await foundVideo.save();
    // const foundVod = await VodModel.findOne({
    //   where: {
    //     aliyun_video_id: id,
    //   }
    // });

    // if (foundVod) {
    //   foundVod.exec_finished = true;
    //   await foundVod.save();
    // }
  }

  async remove(id) {
    const foundVOD = await this.getModel('Vod').findOne({
      where: {
        id: id,
      }
    });

    if (!foundVOD) {
      return null;
    }

    await this.getModel('Vod').destroy({
      where: { id },
    });
    await this.getModel('VodPlayHistory').destroy({
      where: { vod_id: id },
    });

    return true;
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

  async list(args) {
    const {offset, limit, filter, device} = args;
    const Vod = this.getModel('Vod');
    const whereCondition = {
      enable: true,
    };

    if (filter.vodType) {
      whereCondition.vod_type = +filter.vodType;
    }

    if (filter.category) {
      whereCondition.category = +filter.category;
    }

    filter.title && (whereCondition.title = { $like: `%${filter.title}%` });
    let includes = [];
    if (String(device) === 'app') {
      includes.push({
        model: this.getModel('Video'),
        as: 'video',
        required: true,
        where: {
          finished: true,
        },
      });
    }

    const total = await Vod.count({
      where: whereCondition,
      include: includes,
    });

    includes.push({
      model: this.getModel('File'),
      as: 'cover',
    })

    const list = await Vod.all({
      offset,
      limit,
      where: whereCondition,
      order: [
        ['create_time', 'DESC'],
      ],
      include: includes,
    });

    return {
      total,
      list,
    }
  }

  async uploadVodHistory(args) {
    const VodPlayHistory = this.getModel('VodPlayHistory');
    const {user_id, vod_id, ...otherArgs} = args;
    const foundHistory = await VodPlayHistory.findOne({
      where: {
        user_id,
        vod_id,
      }
    });

    if (!foundHistory) {
      args.max_play_seed = args.last_play_seed;
      await VodPlayHistory.create(args);
      return true;
    }

    if (parseInt(foundHistory.duration) === 0) {
      const details = await this.getModel('Vod').findOne({
        id: vod_id,
      });
      if (details) {
        foundHistory.duration = details.duration;
      } else {
        foundHistory.duration = '0';
      }

    }

    foundHistory.last_play_seed = otherArgs.last_play_seed;
    if (+otherArgs.last_play_seed > foundHistory.max_play_seed) {
      foundHistory.max_play_seed = otherArgs.last_play_seed;
    }

    if (parseInt(foundHistory.last_play_seed) === parseInt(foundHistory.duration)) {
      foundHistory.is_finished = true;
    }
    foundHistory.update_time = Date.now();
    await foundHistory.save();
    return true;
  }

  async finishedPlay(id, userID) {
    const VodPlayHistory = this.getModel('VodPlayHistory');

    const foundHistory = await VodPlayHistory.findOne({
      where: {
        vod_id: id,
        user_id: userID,
      }
    });

    if (!foundHistory) {
      throw {
        code: Response.getErrorCode(),
        message: '找不到该条历史记录',
      }
    }


    if (parseInt(foundHistory.duration) === 0) {
      const details = await this.getModel('Vod').findOne({
        id: id,
      });
      if (details) {
        foundHistory.duration = details.duration;
      } else {
        foundHistory.duration = '0';
      }

    }

    foundHistory.is_finished = true;
    await foundHistory.save();

    return true;
  }

  async details(id, device) {
    const Vod = this.getModel('Vod');
    const localVodInfo = await Vod.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.getModel('File'),
          as: 'cover',
        }
      ]
    });
    const streamTypes = [
      'video',
      'audio'
    ];
    if (!localVodInfo) return null;

    if (device === 'app') {
      let format = ['mp4', 'm3u8'][localVodInfo.vod_type];
      const remoteVodInfo = await vodApi.getPlayInfo(localVodInfo.aliyun_video_id, 7 * 24 * 3600, format, streamTypes[localVodInfo.vod_type]);

      const playInfo = remoteVodInfo.PlayInfoList.PlayInfo[0];
      const baseInfo = remoteVodInfo.VideoBase;
      // console.log(remoteVodInfo);
      if (parseInt(localVodInfo.duration) === 0) {
        await this.updateDuration(id, playInfo.Duration);
      }
      localVodInfo.setDataValue('play_info', playInfo);
      localVodInfo.setDataValue('base_info', baseInfo);
    }

    localVodInfo.setDataValue('category_string', config.vod_category[localVodInfo.category])
    return localVodInfo;
  }

  async lastPlayHistory(vodID, userID) {
    const VodPlayHistory = this.getModel('VodPlayHistory');

    return await VodPlayHistory.findOne({
      where: {
        vod_id: vodID,
        user_id: userID,
      }
    });
  }

  async vodHistory(userID, offset, limit) {
    const VodPlayHistory = this.getModel('VodPlayHistory');
    const total = await VodPlayHistory.count({
      where: {
        user_id: userID,
      }
    });
    const playHistory = await VodPlayHistory.all({
      where: {
        user_id: userID,
      },
      offset,
      limit,
      order: [
        ['update_time', 'DESC'],
      ],
      include: [
        {
          model: this.getModel('Vod'),
          as: 'vod_file_info',
          include: [
            {
              model: this.getModel('File'),
              as: 'cover',
            }
          ]
        }
      ]
    });

    return {
      total,
      play_history: playHistory,
    }
  }

  /**
   * 获取导出数据
   * @param ids array
   * @returns {Promise.<Array>}
   */
  async getExportData({ ids }) {
    const VodPlayHistory = this.getModel('VodPlayHistory');
    const condition = {};
    if (ids) {
      condition.vod_id = {
        $in: ids,
      }
    }
    const playHistory = await VodPlayHistory.all({
      where: condition,
      order: [
        ['update_time', 'DESC'],
      ],
      include: [
        {
          model: this.getModel('User'),
          as: 'user',
        },
        {
          model: this.getModel('Vod'),
          as: 'vod_file_info',
          include: [
            {
              model: this.getModel('File'),
              as: 'cover',
            },

          ]
        }
      ]
    });

    let data = {};
    playHistory.forEach(_ => {
      !data[_.vod_id] && (data[_.vod_id] = {
        id: _.vod_file_info.id,
        vod_type: _.vod_file_info.vod_type,
        category: _.vod_file_info.category,
        title: _.vod_file_info.title,
        description: _.vod_file_info.description,
        duration: _.vod_file_info.duration,
        users: [],
      });
      data[_.vod_id].users.push(_.user);
    });

    return Object.values(data);
  }
}