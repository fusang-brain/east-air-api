/**
 * Created by alixez on 17-7-31.
 */

export default async function (req, params, {response, models}) {
  const actID = req.query.act_id;
  const ActModel = models.TradeUnionAct;
  const foundAct = await ActModel.findOne({
    where: {
      id: actID,
    },
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
    ]
  });

  return {
    code: response.getSuccessCode(),
    message: '获取详情成功',
    data: {
      act: foundAct,
    }
  }
}