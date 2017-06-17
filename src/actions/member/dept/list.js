/**
 * Created by alixez on 17-6-17.
 */
import {getSuccessCode, getErrorCode} from '../../../config/response';

export default async function (req, params, {models}) {
  const DeptModel = models.Dept;
  const list = await DeptModel.findAll(
    {include: [
      {model: DeptModel, as: 'children'}
    ]}
    );

  console.log(list);

  return {
    code: getSuccessCode(),
    message: '查看成功',
    data: {
      depts: list,
    }
  }
}