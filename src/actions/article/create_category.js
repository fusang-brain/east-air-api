
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const args = filterParams(req.body, {
    name: ['string', 'required'],
    kind: ['string', 'required'], // ['cate', 'group']
    group: ['string'],
    id_type: ['string'],
  });

  await services.article.createCategory(args);

  return {
    code: response.getSuccessCode('insert'),
    message: '分类创建成功',
  }
}
