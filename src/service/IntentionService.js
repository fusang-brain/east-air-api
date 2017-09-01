/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/21
 */
import Service from './Service'
import Response from '../config/response'

export default class IntentionService extends Service {
  constructor () {
    super();
    this.modelName = 'Intention';
  }

  async create(args) {
    const Intention = this.getModel();
    args.status = 1;

    return await Intention.create(args);
  }

  async generateList({limit, offset, search, sort}) {

    const condition = {
      is_hidden: false,
    };
    if (search) {
      condition.title = {
        $like: `%${search}%`
      }
    }
    let sortCondition = [['vote_count', 'DESC']];

    if (sort === 2) {
      sortCondition = [['vote_count', 'ASC']];
    }

    const total = await this.getModel().count({
      where: condition,
      order: sortCondition,
    });

    const list = await this.getModel().all({
      limit,
      offset,
      where: condition,
      order: sortCondition,
    });

    return {
      total,
      list,
    }
  }

  async details(id, userID) {
    const foundIntention = await this.getModel().findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.getModel('User'),
          as: 'publisher',
          attributes: ['id', 'name', 'avatar'],
        }
      ]
    });

    if (!foundIntention) {
      throw {
        code: Response.getErrorCode(),
        message: '不存在的资源',
      }
    }

    let hasVote = false;

    const mineVoteCount = await this.getModel('IntentionVote').count({
      where: {
        intention_id: id,
        vote_user_id: userID,
      }
    });

    if (mineVoteCount > 0) {
      hasVote = true;
    }

    // foundIntention.setDataValue('vote_count', voteCount);
    foundIntention.setDataValue('has_vote', hasVote);

    return foundIntention;
  }

  async vote(id, userID) {
    const foundIntention = await this.getModel().findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.getModel('User'),
          as: 'publisher',
          attributes: ['id', 'name', 'avatar'],
        }
      ]
    });

    if (!foundIntention) {
      throw {
        code: Response.getErrorCode(),
        message: '不存在的资源',
      }
    }

    if (foundIntention.status === 2) {
      throw {
        code: Response.getErrorCode(),
        message: '该征集已经终止无法投票',
      }
    }
    const IntentionVote = this.getModel('IntentionVote');
    const foundVote = await IntentionVote.findOne({
      where: {
        intention_id: id,
        vote_user_id: userID,
      }
    });

    if (!foundVote) {
      await IntentionVote.create({
        intention_id: id,
        vote_user_id: userID,
        vote_result: 1,
      });

      foundIntention.vote_count += 1;

      await foundIntention.save();
    }

    return true;
  }

  async stop(id) {
    const Intention = this.getModel();
    const foundIntention = await Intention.findOne({
      where: {
        id,
      }
    });

    if (!foundIntention) {
      throw {
        code: Response.getErrorCode(),
        message: '没有找到该资源',
      }
    }

    foundIntention.status = 2;

    await foundIntention.save();

    return {
      code: Response.getSuccessCode(),
      message: '终止成功',
    }
  }

  async marked_hidden(id) {
    return await this.getModel('Intention').update({
      is_hidden: true,
    }, {
      where: {
        id,
      }
    });
  }

}