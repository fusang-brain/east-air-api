/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/22
 */
import Service from './Service';
import Response from '../config/response';
import moment from 'moment';
import lodash from 'lodash';

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
    const SatisfactionSurveyImage = this.getModel('SatisfactionSurveyImage');
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
        survey_id: id,
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
    });

    await SatisfactionSurveyImage.destroy({
      where: {
        survey_id: id,
      }
    });
    await SatisfactionSurveyImage.create(otherArgs.satisfaction_image);

  }

  async evaluate_person(args, currentUser) {
    const {person_id, ...otherArgs} = args;
    const SatisfactionPoll = this.getModel('SatisfactionPoll');

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
    otherArgs.survey_dept = foundUser.dept;
    otherArgs.survey_id = foundSurvey.id;

    const hasEvaluate = await this.hasEvaluated(currentUser, foundSurvey.id);
    if (hasEvaluate) {
      throw {
        code: 2000,
        message: '你今日已经评价！'
      }
    }

    return await this.evaluate(otherArgs);
  }

  async evaluate(args) {
    // args.evaluate_time = Date.now();
    const {tags, ...otherArgs} = args;
    const now = Date.now();
    otherArgs.evaluate_time = now;
    const week = moment(now).week();
    const year = moment(now).year();
    const month = moment(now).month() + 1;
    const quarter = moment(now).quarter();

    otherArgs.evaluate_year = year;
    otherArgs.evaluate_month = month;
    otherArgs.evaluate_week = week;
    otherArgs.evaluate_quarterly = quarter;

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

  async hasEvaluated(userID, surveyID) {
    const SatisfactionPoll = this.getModel('SatisfactionPoll');
    // const poll = await SatisfactionPoll.count({ where: { survey_id: surveyID, evaluate_person_id: userID } });
    const poll = await SatisfactionPoll.findOne({
      where: {
        survey_id: surveyID,
        evaluate_person_id: userID,
      },
      order: [['evaluate_time', 'DESC']],
    })

    if (poll) {
      if (moment().format("YYYY-MM-DD") !== moment(Number(poll.evaluate_time)).format("YYYY-MM-DD")) {
        return false;
      }
      return true;
    }
    return false;
  }

  async generateSiteList({limit, offset}) {

    const total = await this.getModel().count({
      where: {
        survey_type: 1,
      }
    });

    const list = await this.getModel().all({
      where:{
        survey_type: 1,
      },
      limit,
      offset,
      include: [
        {
          model: this.getModel('SatisfactionSurveyImage'),
          as: 'satisfaction_image',
        }
      ],
      order: [['create_time', 'DESC']],
    });

    return {
      total,
      list,
    }
  }

  async generatePersonList({limit, offset, dept}) {

    if (dept && !this.dataAccess.includes(dept)) {
      return {
        total: 0,
        list: [],
      }
    }

    if (!dept) {
      dept = {
        $in: this.dataAccess,
      }
    }

    const total = await this.getModel().count({
      where: {
        survey_type: 0,
      },
      include: [
        {
          model: this.getModel('User'),
          as: 'survey_user',
          required: true,
          where: {
            dept: dept,
          }
        }
      ]
    });

    const list = await this.getModel().all({
      where: {
        survey_type: 0,
      },
      limit,
      offset,
      include: [
        {
          model: this.getModel('SatisfactionSurveyImage'),
          as: 'satisfaction_image',
          required: false,
        },
        {
          model: this.getModel('User'),
          as: 'survey_user',
          required: true,
          where: {
            dept: dept,
          }
        }
      ]
    });

    return {
      total,
      list,
    }
  }

  /**
   * 
   * @param {*} param0 
   */
  async statisticVote({survey_id, dept_id, filter_by, filter_dept, to_heavy}) {
    // const SatisfactionPoll = this.getModel('SatisfactionPoll');
    const resultMapper = [];
    if (!filter_by) {
      filter_by = 'week';
    }
    if (!to_heavy) {
      to_heavy = false;
    }
    let condition = {
      where: {
        survey_id,
      },
      include: [
        {
          model: this.getModel('SatisfactionPollTag'),
          as: 'not_satisfied_tags',
          required: false,
        }
      ],
      order: [
        ['evaluate_time', 'ASC'],
      ],
    };

    if (dept_id) {
      condition.where.survey_dept = dept_id;
    }

    if (filter_dept) {
      condition.include.push({
        model: this.getModel('User'),
        as: 'evaluate_person',
        required: true,
        where: {
          dept: filter_dept,
        }
      })
    }

    if (survey_id === null) {
      delete condition.where.survey_id;
    }
    if (filter_by !== 'year') {
      condition.where.evaluate_year = moment().year();
    }

    const allPolls = await this.getModel('SatisfactionPoll').all(condition);

    const peopleCountMapper = {};
    const satisfiedPeopleCountMapper = {};
    const peopleVoteRecord = {};
    for (let i = 0; i < allPolls.length; i ++) {
      const poll = allPolls[i];
      // 如果去重
      if (to_heavy) {
        if (!peopleVoteRecord[poll.evaluate_person_id]) {
          peopleVoteRecord[poll.evaluate_person_id] = [];
        }
        // console.log(to_heavy, '---- a');
        if (Array.isArray(peopleVoteRecord[poll.evaluate_person_id])) {
          let item = peopleVoteRecord[poll.evaluate_person_id];
          if (lodash.findIndex(item, (o) => {
            let ok = o.level === poll.satisfaction_level;
            if (filter_by === 'week') {
              return ( ok && o.week === `${poll.evaluate_week}-${poll.evaluate_month}`);
            }
            if (filter_by === 'year') {
              return ( ok && o.year === poll.evaluate_year);
            }

            if (filter_by === 'month') {
              return (ok && o.month === poll.evaluate_month);
            }

            if (filter_by === 'quarterly') {
              return (ok && o.quarterly === poll.evaluate_quarterly)
            }
          }) >= 0) {
            continue;
          }
        }

        peopleVoteRecord[poll.evaluate_person_id].push({
          level: poll.satisfaction_level,
          week: `${poll.evaluate_week}-${poll.evaluate_month}`,
          month: poll.evaluate_month,
          year: poll.evaluate_year,
          quarterly: poll.evaluate_quarterly,
        });
      }

      let key = `${poll.evaluate_week}-${poll.evaluate_month}`;
      if (filter_by === 'month') {
        key = `${poll.evaluate_month}`;
      }
      if (filter_by === 'year') {
        key = `${poll.evaluate_year}`;
      }

      if (filter_by === 'quarterly') {
        key = `${poll.evaluate_quarterly}`;
      }

      if (!resultMapper[key]) {
        resultMapper[key] = {
          evaluate_week: poll.evaluate_week,
          evaluate_month: poll.evaluate_month,
          evaluate_year: poll.evaluate_year,
          evaluate_quarter: poll.evaluate_quarterly,
          vote_count: 0,
          people_count: 0,
          satisfied_people_count: 0,
          very_satisfied_count: 0,
          very_satisfied_rate: 0,
          satisfied_count: 0,
          satisfied_rate: 0,
          not_satisfied_count: 0,
          not_satisfied_rate: 0,
          tags_count: {},
          tags_rate: {},
          tags_total: 0,
        };
      }

      resultMapper[key].vote_count += 1;
      const personUniqueKey = `${key}_${poll.evaluate_person_id}`;
      if (!peopleCountMapper[personUniqueKey]) {
        resultMapper[key].people_count += 1;
        peopleCountMapper[personUniqueKey] = true;
      }
      if (poll.satisfaction_level !== 'not_satisfied' && !satisfiedPeopleCountMapper[personUniqueKey]) {
        resultMapper[key].satisfied_people_count += 1;
        satisfiedPeopleCountMapper[personUniqueKey] = true;
      }

      switch (poll.satisfaction_level) {
        case 'very_satisfied':
          resultMapper[key].very_satisfied_count += 1;
          break;
        case 'satisfied':
          resultMapper[key].satisfied_count += 1;
          break;
        case 'not_satisfied':
          resultMapper[key].not_satisfied_count += 1;
          poll.not_satisfied_tags.forEach(tag => {
            if (!resultMapper[key].tags_count[tag.tag]) {
              resultMapper[key].tags_count[tag.tag] = 0;
            }
            resultMapper[key].tags_count[tag.tag] += 1;
            resultMapper[key].tags_total += 1;
            // resultMapper[key].tags_rate[tag.tag] = Math.round(resultMapper[key].tags_count[tag.tag] / resultMapper[key].tags_total * 100);

          });
          break;
      }
      let vote_count = resultMapper[key].vote_count;
      let verySatisfiedRate = Math.round(resultMapper[key].very_satisfied_count / resultMapper[key].vote_count * 10000) / 100;
      let satisfiedRate = Math.round(resultMapper[key].satisfied_count / vote_count * 10000) / 100;
      let notSatisfiedRate = Math.round(resultMapper[key].not_satisfied_count / vote_count * 10000) / 100;
      if (+resultMapper[key].not_satisfied_count === 0) {
        satisfiedRate = 100 - (verySatisfiedRate);
      }
      resultMapper[key].very_satisfied_rate = verySatisfiedRate;
      resultMapper[key].satisfied_rate = satisfiedRate;
      resultMapper[key].not_satisfied_rate = 100 - (verySatisfiedRate + satisfiedRate);

    }

    const result = [];
    for (let key in resultMapper) {
      for (let tag in resultMapper[key].tags_count) {
        // console.log(tag);
        resultMapper[key].tags_rate[tag] = Math.round(resultMapper[key].tags_count[tag] / resultMapper[key].tags_total * 100);
      }
      result.push(resultMapper[key]);
    }

    return result;
  }

  async recentWeekStatisticVote({survey_id, dept_id, type}) {
    const SatisfactionPoll = this.getModel('SatisfactionPoll');
    let condition = {
      where: {
        survey_id,
      },
      include: [
        {
          model: this.getModel('SatisfactionPollTag'),
          as: 'not_satisfied_tags',
        }
      ]
    };

    if (dept_id) {
      condition.where.survey_dept = dept_id;
      delete condition.where.survey_id;
    }

    if (survey_id === null) {
      delete condition.where.survey_id;
    }

    const startOfWeek = moment().startOf('week').valueOf();
    const endOfWeek = moment().endOf('week').valueOf();

    condition.where.evaluate_time = {
      $lt: endOfWeek,
      $gt: startOfWeek,
    }

    const allPolls = await this.getModel('SatisfactionPoll').all(condition);
    const weekDayMapper = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    let total = 0;
    let pieChart = {
      total: 0,
      satisfied: {
        total: 0,
        rate: 0,
      },
      very_satisfied: {
        total: 0,
        rate: 0,
      },
      not_satisfied: {
        total: 0,
        rate: 0,
      }
    }
    allPolls.forEach(poll => {
      total += 1;
      if (poll.satisfaction_level !== 'not_satisfied') {
        let weekDay = moment(+poll.evaluate_time).days();

        if (!weekDayMapper[weekDay]) {
          weekDayMapper[weekDay] = 0;
        }

        weekDayMapper[weekDay] += 1;
      }

      if (poll.satisfaction_level === 'satisfied') {
        pieChart.satisfied.total += 1;
      }

      if (poll.satisfaction_level === 'very_satisfied') {
        pieChart.very_satisfied.total += 1;
      }

      if (poll.satisfaction_level === 'not_satisfied') {
        pieChart.not_satisfied.total += 1;
      }

    });

    const weekDistributedRate = [];

    for (let key in weekDayMapper) {
      if (total === 0) {
        weekDistributedRate[key] = 0;
      } else {
        weekDistributedRate[key] = Math.round(weekDayMapper[key] / total * 100);
      }
    }
    let notSatisfiedRate = Math.round(pieChart.not_satisfied.total / total * 100);
    pieChart.satisfied.rate = Math.round(pieChart.satisfied.total / total * 100);
    pieChart.very_satisfied.rate = Math.round(pieChart.very_satisfied.total / total * 100);
    pieChart.not_satisfied.rate = 100 - (pieChart.satisfied.rate + pieChart.very_satisfied.rate);
    pieChart.total = total;

    return {
      week_distribute_rate: weekDistributedRate,
      pie_chart: pieChart,
    };
  }

  async evaluateList(args) {
    const {id, offset, limit} = args;
    const SatisfactionPoll = this.getModel('SatisfactionPoll');
    const total = await SatisfactionPoll.count({
      where: {
        survey_id: id,
      }
    })
    const list = await SatisfactionPoll.all({
      where: {
        survey_id: id,
      },
      offset,
      limit,
      include: [
        {
          model: this.getModel('User'),
          as: 'evaluate_person',
        },
        {
          model: this.getModel('SatisfactionPollTag'),
          as: 'not_satisfied_tags',
        }
      ],
      order:[['evaluate_time', 'DESC']],
    });

    const levelMapper = {
      'very_satisfied': '非常满意',
      'satisfied': '满意',
      'not_satisfied': '不满意',
    };

    const result = list.map(value => ({
      user_name: value.evaluate_person.name,
      evaluate_time: value.evaluate_time,
      options: value.options,
      satisfaction_level: value.satisfaction_level,
      satisfaction_level_str: levelMapper[value.satisfaction_level],
      not_satisfied_tags: value.not_satisfied_tags,
    }));

    return {
      total,
      list: result,
    }
  }

  async getAllVoteData(kind) {
    const SatisfactionPoll = this.getModel('SatisfactionPoll');
    const SatisfactionSurvey = this.getModel('SatisfactionSurvey');
    const Department = this.getModel('Dept');
    const User = this.getModel('User');
    if (kind === 'site') {
      const queryStr = "SELECT (SELECT group_concat(spt.tag) FROM SatisfactionPollTags spt WHERE spt.survey_poll_id = sp.id GROUP BY spt.survey_poll_id) as tags, ss.survey_subject, dui.name as do_user_name, dui.mobile as do_user_mobile, dui.card_num as do_user_card_num, sp.satisfaction_level, sp.options, sp.evaluate_time, dept.dept_name as do_user_dept_name FROM `" + SatisfactionPoll.tableName + "` sp"
        + " LEFT JOIN `" + SatisfactionSurvey.tableName + "` ss ON ss.id = sp.survey_id"
        + " LEFT JOIN `" + User.tableName + "` dui ON dui.id = sp.evaluate_person_id"
        + " LEFT JOIN `" + Department.tableName + "` dept ON dept.id = dui.dept"
        + " WHERE ss.survey_type = 1";

      return await this.connect.query(queryStr, {
        type: this.sequelize.QueryTypes.SELECT,
      });

    } else if (kind === 'person') {
      const queryStr = `SELECT (SELECT group_concat(spt.tag) FROM SatisfactionPollTags spt WHERE spt.survey_poll_id = sp.id GROUP BY spt.survey_poll_id) as tags, ui.name as survey_name, ui.card_num as survey_card_num, ui.mobile as survey_mobile, dui.name as do_user_name, dui.mobile as do_user_mobile, dui.card_num as do_user_card_num, sp.satisfaction_level, sp.options, sp.evaluate_time, dept.dept_name as do_user_dept_name, surveyDept.dept_name as survey_dept_name FROM \`${SatisfactionPoll.tableName}\` as sp LEFT JOIN \`${SatisfactionSurvey.tableName}\` ss ON ss.id = sp.survey_id`
        + " LEFT JOIN `" + User.tableName + "` ui ON ui.id = ss.survey_user_id"
        + " LEFT JOIN `" + User.tableName + "` dui ON dui.id = sp.evaluate_person_id"
        + " LEFT JOIN `" + Department.tableName + "` dept ON dept.id = dui.dept"
        + " LEFT JOIN `" + Department.tableName + "` surveyDept ON surveyDept.id = ui.dept"
        + " WHERE ss.survey_type = 0";

      return await this.connect.query(queryStr, {
        type: this.sequelize.QueryTypes.SELECT,
      });
    }
  };

  // async statisticsVoteByWeek() {
  //   const SatisfactionPoll = this.getModel('SatisfactionPoll');
  //
  //   // const queryStr = `SELECT COUNT() as times FROM \`${SatisfactionPoll.tableName}\` as sp GROUP BY sp.evaluate_week, sp.evaluate_month`;
  //
  //   const results = [];
  //   const voteTimesMapper = {};
  //   const votePeopleMapper = {};
  //   const voteGoodPeopleMapper = {};
  //   const verySatisfiedMapper = {};
  //   const satisfiedMapper = {};
  //   const notSatisfiedMapper = {};
  //
  //   const voteTimesList = await SatisfactionPoll.all({
  //     attributes: ['evaluate_week', 'evaluate_month', [this.connect.fn('COUNT', this.connect.col('id')), 'total']],
  //     group:['evaluate_week', 'evaluate_month'],
  //   });
  //
  //   const votePeopleCount = await SatisfactionPoll.all({
  //     attributes: ['evaluate_week', 'evaluate_month', 'evaluate_person_id'],
  //     group:['evaluate_week', 'evaluate_month', 'evaluate_person_id'],
  //   });
  //
  //   const voteGoodPeopleCount = await SatisfactionPoll.all({
  //     attributes: ['evaluate_week', 'evaluate_month', 'evaluate_person_id'],
  //     where: {
  //       satisfaction_level: {
  //         $ne: 'not_satisfied',
  //       }
  //     },
  //     group: ['evaluate_week', 'evaluate_month', 'evaluate_person_id'],
  //   });
  //
  //   const voteVeryGoodCount = await SatisfactionPoll.all({
  //     attributes: ['evaluate_week', 'evaluate_month', [this.connect.fn('COUNT', this.connect.col('id')), 'total']],
  //     where: {
  //       satisfaction_level: 'very_satisfied',
  //     },
  //     group: ['evaluate_week', 'evaluate_month'],
  //   });
  //
  //
  //   const voteGoodCount = await SatisfactionPoll.all({
  //     attributes: ['evaluate_week', 'evaluate_month', [this.connect.fn('COUNT', this.connect.col('id')), 'total']],
  //     where: {
  //       satisfaction_level: 'satisfied',
  //     },
  //     group: ['evaluate_week', 'evaluate_month'],
  //   });
  //
  //   console.log(voteGoodCount, '-----');
  //
  //   const voteNotGoodCount = await SatisfactionPoll.all({
  //     attributes: ['evaluate_week', 'evaluate_month', [this.connect.fn('COUNT', this.connect.col('id')), 'total']],
  //     where: {
  //       satisfaction_level: 'not_satisfied',
  //     },
  //     group: ['evaluate_week', 'evaluate_month'],
  //   });
  //
  //   voteVeryGoodCount.forEach(item => {
  //     verySatisfiedMapper[`${item.evaluate_week}-${item.evaluate_month}`] = item.dataValues.total;
  //   });
  //   voteGoodCount.forEach(item => {
  //     satisfiedMapper[`${item.evaluate_week}-${item.evaluate_month}`] = item.dataValues.total;
  //   });
  //   voteNotGoodCount.forEach(item => {
  //     notSatisfiedMapper[`${item.evaluate_week}-${item.evaluate_month}`] = item.dataValues.total;
  //   })
  //
  //   voteTimesList.forEach(item => {
  //     results.push({
  //       evaluate_week: item.evaluate_week,
  //       evaluate_month: item.evaluate_month,
  //     });
  //
  //     voteTimesMapper[`${item.evaluate_week}-${item.evaluate_month}`] = item.dataValues.total;
  //   });
  //
  //   votePeopleCount.forEach(item => {
  //     let vote = votePeopleMapper[`${item.evaluate_week}-${item.evaluate_month}`]
  //     if (typeof vote === 'undefined') {
  //       votePeopleMapper[`${item.evaluate_week}-${item.evaluate_month}`] = 1
  //     } else {
  //       votePeopleMapper[`${item.evaluate_week}-${item.evaluate_month}`] += 1;
  //     }
  //   });
  //
  //   voteGoodPeopleCount.forEach(item => {
  //     if (!voteGoodPeopleMapper[`${item.evaluate_week}-${item.evaluate_month}`]) {
  //       voteGoodPeopleMapper[`${item.evaluate_week}-${item.evaluate_month}`] = 1;
  //     } else {
  //       voteGoodPeopleMapper[`${item.evaluate_week}-${item.evaluate_month}`] += 1;
  //     }
  //   });
  //
  //   results.forEach(item => {
  //     let key = `${item.evaluate_week}-${item.evaluate_month}`;
  //     item.vote_count = voteTimesMapper[key] || 0;
  //     item.vote_people_count = votePeopleMapper[key] || 0;
  //     item.satisfied_people_count = votePeopleMapper[key] || 0;
  //     item.very_satisfied_votes = verySatisfiedMapper[key] || 0;
  //     item.satisfied_votes = satisfiedMapper[key] || 0;
  //     item.not_satisfied_votes = notSatisfiedMapper[key] || 0;
  //
  //     item.very_satisfied_votes = Math.round(item.very_satisfied_votes / item.vote_count * 100);
  //     item.not_satisfied_votes = Math.round(item.not_satisfied_votes / item.vote_count * 100);
  //     item.satisfied_votes = Math.round(item.satisfied_votes / item.vote_count * 100);
  //     // item.very_satisfied_votes = item.very_satisfied_votes / item.vote_count;
  //   })
  //   console.log(results);
  //   // console.log(voteTimesMapper);
  //   // console.log(votePeopleMapper);
  //   // console.log(voteGoodPeopleMapper);
  //   // console.log(satisfiedMapper, '1');
  //   // console.log(verySatisfiedMapper, '2');
  //   // console.log(notSatisfiedMapper, '3');
  // }
}