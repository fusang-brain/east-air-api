/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/22
 */
import Service from './Service'
import Response from '../config/response'

export default class SatisfactionSurveyService extends Service {
  constructor () {
    super();
    this.modelName = 'SatisfactionSurvey';
  }

  async create(args) {

    const {image, ...otherArgs} = args;
    const SatisfactionSurvey = this.getModel();
    otherArgs.is_system_survey = false;
    otherArgs.state = 1;
    otherArgs.survey_type = 1;

    const file = await this.getModel('File').findOne({
      where: {
        id: image,
      }
    });

    if (!file) {
      throw {
        code: Response.getErrorCode(),
        message: '没有找到您上传的封面图片',
      }
    }

    otherArgs.satisfaction_image = {
      file_id: image,
      file_path: file.path,
      file_size: file.size,
    };

    return await SatisfactionSurvey.create(otherArgs, {
      include: [
        {
          model: this.getModel('SatisfactionSurveyImage'),
          as: 'satisfaction_image',
        }
      ]
    });
  }

  async remove(id) {
    const SatisfactionSurvey = this.getModel();
    const SatisfactionSurveyImage = this.getModel('SatisfactionSurveyImage');
    const SatisfactionPoll = this.getModel('SatisfactionPoll');

    const result = await SatisfactionSurvey.destroy({
      where: {
        id,
        is_system_survey: false,
      }
    });

    if (result > 0) {
      console.log('remove row', result);
    }
    return true;
  }

  async update(id, args) {
    const {image, ...otherArgs} = args;
    const SatisfactionSurvey = this.getModel();
    // otherArgs.is_system_survey = false;
    // otherArgs.state = 1;
    // otherArgs.survey_type = 1;

    if (image) {
      const file = await this.getModel('File').findOne({
        where: {
          id: image,
        }
      });

      if (!file) {
        throw {
          code: Response.getErrorCode(),
          message: '没有找到您上传的封面图片',
        }
      }

      otherArgs.satisfaction_image = {
        file_id: image,
        file_path: file.path,
        file_size: file.size,
      };
    }

    await SatisfactionSurvey.update(otherArgs, {
      where: {
        id,
        is_system_survey: false,
      }
    })

  }

  async evaluate_person(args, currentUser) {
    const {person_id, ...otherArgs} = args;

    const foundUser = await this.getModel('User').findOne({
      where: {
        id: person_id,
      }
    });

    if (!foundUser) {
      throw {
        code: Response.getErrorCode(),
        message: '没有找到该用户',
      }
    }

    let foundSurvey = await this.getModel().findOne({
      where: {
        survey_type: 0,
        survey_user_id: person_id,
      }
    });

    if (!foundSurvey) {
      foundSurvey = await this.getModel().create({
        survey_type: 0,
        survey_subject: '人员调查',
        survey_user_id: person_id,
        state: 1,
        user_id: currentUser,
      });
    }

    otherArgs.survey_id = foundSurvey.id;
    return await this.evaluate(otherArgs);
  }

  async evaluate(args) {
    // args.evaluate_time = Date.now();
    const {tags, ...otherArgs} = args;
    otherArgs.evaluate_time = Date.now();
    if (otherArgs.satisfaction_level === 'not_satisfied' && Array.isArray(tags) && tags.length > 0) {
      otherArgs.not_satisfied_tags = tags.map(tag => ({
        tag,
      }));
    }

    await this.getModel('SatisfactionPoll').create(otherArgs, {
      include: [
        {
          model: this.getModel('SatisfactionPollTag'),
          as: 'not_satisfied_tags',
        }
      ]
    });
  }

  async generateSiteList({limit, offset}) {

    const total = await this.getModel().count({
      survey_type: 1,
      limit,
      offset,
    });

    const list = await this.getModel().all({
      survey_type: 1,
      limit,
      offset,
      include: [
        {
          model: this.getModel('SatisfactionSurveyImage'),
          as: 'satisfaction_image',
        }
      ]
    });

    return {
      total,
      list,
    }
  }
}