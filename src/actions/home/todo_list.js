/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/28
 */

export default async (req, params, {response, services}) => {
  // todo get abstruct list of todo list
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;

  const {approvals} = await services.approval.approvalList({
    state: 'all',
    type: 'all',
    user_id: req.user.id,
    notLimit: true,
    dataAccess: req.dataAccess,
  });

  const {list, total} = await services.doc.generateList({
    filter: {
      unread: true,
    },
    userID: req.user.id,
    notLimit: true,
  });

  // C1508FB3AA5E9F4E49920A9618AA96F5DC287182
  const todoList = [];

  approvals.forEach(approval => {
    todoList.push({
      id: approval.id,
      task_name: approval.project_subject,
      task_type: approval.approval_type,
      create_time: approval.publish_date,
    });
  });

  // 公文
  list.forEach(item => {
    todoList.push({
      id: item.id,
      task_name: item.doc_title,
      task_type: 4,
      create_time: item.create_time,
    });
  });

  todoList.sort((a, b) => {
    return a.create_time > b.create_time;
  })

  // console.log(approvals, 'approvals');
  // console.log(list, 'doc list');
  // console.log(total, 'doc total');

  console.log(todoList, ' ====> list');
  // const todoList = [
  //   {
  //     subject: '',
  //     subject_type: '',
  //     time: '',
  //
  //   }
  // ];




  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      total: todoList.length,
      task_list: todoList.splice(offset, offset + limit),
    },
  }
}