/**
 * Created by alixez on 17-7-29.
 */
import {filterParams} from '../../utils/filters';

export default async function (req, param, {response, models}) {
  const params = filterParams(req.query, {
    search: 'string',
    state: 'string',
  });
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const condition = {};
  const ActModel = models.TradeUnionAct;
  if (params.search) {
    condition.subject = {
      $like: `%${params.search}%`,
    };
  }
  if (params.state) {
    condition.state = params.state
  }
  console.log(condition);
  const list = await ActModel.all({
    where: condition,
    attributes: ['no', 'id', 'subject', 'act_type', 'create_date', 'state'],
    include: [
      {
        model: models.User,
        as: 'publisher',
        required: false,
        attributes: ['id', 'name', 'avatar']
      },
      {
        model: models.Dept,
        as: 'department',
        required: false,
        attributes: ['id', 'dept_name'],
      }
    ],
    offset,
    limit,
  });

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      list
    }
  }

}