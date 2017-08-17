/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/16
 */

import Service from './Service';
export default class DocService extends Service {

  constructor() {
    super();
    this.modelName = "Docs";
  }

  async generateList({offset, limit, filter}) {
    const Doc = this.getModel();
    const condition = {};
    if (filter.search) {
      condition.doc_title = {
        $like: `%${filter.search}%`,
      }
    }

    if (filter.doc_type) {
      condition.doc_type = filter.doc_type;
    }
    if (filter.level) {
      condition.doc_level = filter.level;
    }
    const originList = await Doc.all({
      offset,
      limit,
      where: condition,
      include: [
        {
          model: this.getModel('DocAttach'),
          as: 'attach',
        }
      ]
    });

    // todo execute origin list

    return originList;
  }

  async create(args) {
    const {attach, receivers, ...params} = args;
    const Doc = this.getModel();

    if (attach) {
      const File = this.getModel('File');
      const attachObjs = await File.all({
        where: {
          id: {
            $in: attach,
          }
        }
      });
      params.attach = attachObjs.map(item => ({
        file_id: item.file_id,
        file_path: item.file_path,
        file_size: item.file_size,
      }));
    }

    if (receivers) {
      params.receivers = receivers.map(value => ({
        receiver_id: value,
        receiver_type: 'personal',
      }));
    }

    return await Doc.create(params, {
      include: [
        {
          model: this.getModel('DocAttach'),
          as: 'attach',
        },
        {
          model: this.getModel('DocReceivers'),
          as: 'receivers',
        }
      ]
    });
  }

  async markedRead(docID, userID) {
    const DocReadReceipts = this.getModel('DocReadReceipts');
    let docReadReceipts = await DocReadReceipts.findOne({
      where: {
        user_id: userID,
        doc_id: docID,
      }
    });
    if (!docReadReceipts) {
      docReadReceipts = await DocReadReceipts.create({
        user_id: userID,
        doc_id: docID,
        read_time: Date.now(),
      })
    }

    return docReadReceipts;
  }

  async update(id, args) {

  }

  async remove(id) {

  }

  async details(id) {

  }
}