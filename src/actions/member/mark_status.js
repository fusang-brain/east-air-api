/**
 * Created by alixez on 17-7-25.
 */
import {filterParams} from '../../utils/filters';

export default async function (req, params, {models, response, checkAccess}) {
  const args = filterParams(req.body, {
    type: ['string', 'required'],
    user: ['string', 'required'],
  });

  const User = models.User;
  const foundUser = await User.findOne({
    where: {
      id: args.user,
    }
  });

  if (!foundUser) {
    return {
      code: response.getErrorCode(),
      message: 'Not found the user',
    }
  }
  switch (args.type) {
    case 'to_difficult':
      // 困难
      await checkAccess('member', 'mark_difficult');
      foundUser.other_status = 1;
      break;
    case 'to_quit_work':
      // 离职
      await checkAccess('member', 'mark_retirement');
      foundUser.state = 2;
      break;
    case 'to_retirement':
      // 退休
      await checkAccess('member', 'mark_retirement');
      foundUser.state = 3;
      break;
    default:
      return {
        code: response.getErrorCode('update'),
        message: '标记失败',
      }
  }

  await foundUser.save();

  return {
    code: response.getSuccessCode('update'),
    message: '标记成功',
  }
}