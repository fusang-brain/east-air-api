/**
 * Created by alixez on 17-7-29.
 */
export default async function (req, params, {response, models}) {
  const actID = req.body.act_id;
  const foundAct = await models.TradeUnionAct.findOne({where: {id: actID}});
  if (!foundAct) {
    return {
      code: response.getSuccessCode(),
      message: '没有找到您要删除的活动',
    }
  }
  if (![0, 3].includes(foundAct.state)) {
    return {
      code: response.getErrorCode('remove'),
      message: '此活动无法删除',
    }
  }
  await models.TradeUnionAct.destroy({where: {id: actID}});

  return {
    code: response.getSuccessCode('remove'),
    message: '删除成功',
  }
}