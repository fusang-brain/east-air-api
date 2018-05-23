import Service from './Service';
import Response from '../config/response';
import moment from 'moment';

export default class ArticleService extends Service {
  constructor() {
    super();
    this.modelName = "Article";
    this.dataAccess = [];
  }

  async groupList(user) {
    const ArticleModel = this.getModel("Article");
    const GroupModel = this.getModel('ArticleGroup');

    let articleLastRead = await this.getModel('ArticleLastRead').findOne({
      where: {
        user_id: user,
      }
    });

    if (!articleLastRead) {
      articleLastRead = await this.getModel('ArticleLastRead').create({
        user_id: user,
        time: 0,
      });
    }
    const groups = await GroupModel.all({
      order: [['sort', 'ASC']],
    });
    for (let i = 0; i < groups.length; i ++) {
      let group = groups[i];
      let count = await ArticleModel.count({
        where: {
          group_id: group.id,
          create_at: {
            $gt: articleLastRead.time,
          }
        },
      });

      if (group.id_type === "video") {
        count = 0;
      }

      group.setDataValue('unReadCount', count);
    }

    return groups;
  }

  async categories({ group }) {
    const CategoryModel = this.getModel("ArticleCategory");
    const categories = await CategoryModel.all({
      where: {
        group,
      }
    });

    return categories;
  }

  matchImages(content='') {
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let arr = content.match(imgReg) || [];
    const imgs = [];
    for (let i = 0;i < arr.length; i ++) {
      const src = arr[i].match(srcReg);
      if (src[1]) {
        imgs.push(src[1]);
      }
    }

    return imgs;
  }

  async createCategory({ kind, name, group, id_type }) {
    const CategoryModel = this.getModel('ArticleCategory');
    const CateGroup = this.getModel('ArticleGroup');
    if (kind === 'cate') {
      await CategoryModel.create({
        name,
        group,
      });
    }
    if (kind === 'group') {
      await CateGroup.create({
        name,
        id_type,
      });
    }

    return true;
  }

  async removeCategory(id) {
    await this.getModel('ArticleCategory').destroy({
      where: {
        id,
      }
    });
  }

  async batchCreateCategory({ names, group }) {
    const CategoryModel = this.getModel('ArticleCategory');

    const cates = names.map(_ => ({
      name: _,
      group: group,
    }));

    await CategoryModel.bulkCreate(cates);
  }

  async create({ title, category, groupID, description, content = '', videos = [] }, user) {
    const ArticleModel = this.getModel("Article");
    const ArticleVideoModel = this.getModel("ArticleVideo");
    const ArticleReadCount = this.getModel("ArticleReadCount");
    const covers = this.matchImages(content);

    const article = await ArticleModel.create({
      title,
      category,
      group_id: groupID,
      description,
      content,
      publisher: user,
      covers: JSON.stringify(covers),
    });

    if (videos.length > 0) {
      await ArticleVideoModel.bulkCreate(videos.map(_ => ({
        article_id: article.id,
        video_id: _,
      })));
    }

    // await ArticleReadCount.create({
    //   article_id: article.id,
    //   group_id: article.group_id,
    //   user_id: user,
    // });

    return article;
  }

  async toggleTop(id) {
    const ArticleModel = this.getModel("Article");
    const foundArticle = await ArticleModel.findOne({
      where: {
        id,
      }
    });

    if (!foundArticle) {
      throw {
        code: Response.getErrorCode(),
        message: "不存在该动态文章",
      }
    }

    foundArticle.is_top = !foundArticle.is_top;
    foundArticle.update_at = Date.now();

    await foundArticle.save();
    return foundArticle.is_top;
  }

  async list({offset = 0, limit = 20, filter}, user, device) {
    let articleLastRead = await this.getModel('ArticleLastRead').findOne({
      where: {
        user_id: user,
      }
    });

    if (!articleLastRead) {
      articleLastRead = await this.getModel('ArticleLastRead').create({
        user_id: user,
        time: 0,
      });
    }

    const ArticleModel = this.getModel("Article");
    
    const condition = {};
    if (filter && filter.title) {
      condition.title = {
        $like: `%${filter.title}%`
      }
    }

    // let startOf = null;
    // let endOf = null;
    const createAtCondition = {};

    if (filter && filter.start) {
      const startOf = moment(+filter.start).startOf('day').valueOf();
      createAtCondition['$gte'] = startOf;
    }

    if (filter && filter.end) {
      const endOf = moment(+filter.end).endOf('day').valueOf()
      createAtCondition['$lte'] = endOf;
    }

    if (Object.keys(createAtCondition).length > 0) {
      condition.create_at = createAtCondition;
    }
    console.log(createAtCondition, 'createAtCondition');

    // todo fix date filter

    if (filter && filter.date) {
      const d = +filter.date;
      const startOf = moment(d).startOf('day').valueOf();
      // console.log(d, '+');
      const endOf = moment(d).endOf('day').valueOf();
      // console.log(d, '-');
      condition.update_at = {
        $gte: startOf,
        $lte: endOf,
      }
      // console.log(condition, 'condition');
    }

    if (filter && filter.group) {
      condition.group_id = filter.group;
    }

    if (filter && filter.category) {
      condition.category = filter.category;
    }

    const total = await ArticleModel.count({
      where: condition,

    });
    // await ArticleModel.update({
    //   is_read: true,
    // }, {
    //   where: {
    //     is_read: false,
    //   },
    // });
    const list = await ArticleModel.all({
      offset,
      limit,
      where: condition,
      include: [
        {
          model: this.getModel('Video'),
          as: 'videos',
        },
        {
          model: this.getModel('User'),
          as: 'publisherObject',
        },
        {
          model: this.getModel('ArticleCategory'),
          as: 'cate',
        },
        {
          model: this.getModel('ArticleGroup'),
          as: 'group',
        }
      ],
      order: [['is_top', 'DESC'], ['create_at', 'DESC']]
    });

    if (device === 'app') {
      // 当且仅当app访问列表时更新上次访问时间
      articleLastRead.time = Date.now();
      await articleLastRead.save();
    }

    return {
      total,
      list,
    }
  }

  async update(id, { title, category, groupID, description, content, videos = [] }) {
    const ArticleModel = this.getModel("Article");
    const ArticleVideoModel = this.getModel("ArticleVideo");
    const foundArticle = await ArticleModel.findOne({
      where: {
        id,
      }
    }, {
      include: [
        {
          model: this.getModel('Video'),
          as: 'videos',
        }
      ]
    });

    if (!foundArticle) {
      throw {
        code: Response.getErrorCode(),
        message: "不存在该动态文章",
      }
    }

    foundArticle.title = title;
    foundArticle.category = category;
    foundArticle.group_id = groupID;
    foundArticle.description = description;
    if (String(foundArticle.content) !== String(content)) {
      foundArticle.covers = JSON.stringify(this.matchImages(content));
    }
    foundArticle.content = content;
    foundArticle.update_at = Date.now();
    await foundArticle.save();

    if ((videos || []).length > 0) {
      await ArticleVideoModel.destroy({
        where: {
          article_id: foundArticle.id,
        }
      });
      await ArticleVideoModel.bulkCreate(videos.map(_ => ({
        article_id: foundArticle.id,
        video_id: _,
      })));
    }
  }

  async details(id) {
    const ArticleModel = this.getModel("Article");
    const details = await ArticleModel.findOne({
      where: {
        id
      },
      include: [
        {
          model: this.getModel('Video'),
          as: 'videos',
        },
        {
          model: this.getModel('User'),
          as: 'publisherObject',
        },
        {
          model: this.getModel('ArticleCategory'),
          as: 'cate',
        },
        {
          model: this.getModel('ArticleGroup'),
          as: 'group',
        }
      ],
    });

    return details;
  }

  async remove(id) {
    const ArticleModel = this.getModel('Article');
    await ArticleModel.destroy({
      where: {
        id,
      }
    });
  }
}