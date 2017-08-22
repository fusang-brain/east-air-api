/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/16
 */

import Service from './Service';
import Response from '../config/response'
export default class DocService extends Service {

  constructor() {
    super();
    this.modelName = "Docs";

  }

  async generateList({offset, limit, filter, userID}) {
    const Doc = this.getModel();
    const condition = {};
    if (filter && filter.search) {
      condition.doc_title = {
        $like: `%${filter.search}%`,
      }
    }

    if (filter && filter.doc_type) {
      condition.doc_type = filter.doc_type;
    }

    if (filter && filter.doc_level) {
      condition.doc_level = filter.doc_level;
    }

    if (filter && filter.unread) {
      const readReceipts = await this.getModel('DocReadReceipts').all({
        where: {
          user_id: userID,
        }
      });

      console.log(readReceipts, '---===');

      const readedDocIDs = readReceipts.map(item => {
        return item.doc_id;
      });

      console.log(readedDocIDs, '---====----');

      if (readedDocIDs.length > 0) {
        condition.id = {
          $notIn: readedDocIDs,
        }
      }
    }

    console.log(condition);

    const total = await Doc.count({
      where: condition,
      include: [
        {
          model: this.getModel('DocReceivers'),
          as: 'receivers',
          required: true,
          where: {
            receiver_id: userID,
          }
        }
      ]
    })

    const originList = await Doc.all({
      offset,
      limit,
      where: condition,
      include: [
        {
          model: this.getModel('DocReceivers'),
          as: 'receivers',
          required: true,
          where: {
            receiver_id: userID,
          }
        }
      ]
    });

    const list = originList.map(item => ({
      id: item.id,
      doc_note: item.doc_note,
      doc_title: item.doc_title,
      doc_type: item.doc_type,
      doc_level: item.doc_level,
      create_time: item.create_time,
    }));

    return {
      total,
      list,
    }
  }

  async unreadTotal(userID) {
    const total = await this.getModel('Docs').count({
      include: [
        {
          model: this.getModel('DocReceivers'),
          as: 'receivers',
          required: true,
          where: {
            receiver_id: userID,
          }
        }
      ]
    });

    console.log(total);

    const hasReadTotalByUser = await this.getModel('DocReadReceipts').count({
      where: {
        user_id: userID,
      }
    });

    return parseInt(total) - parseInt(hasReadTotalByUser);
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
        file_id: item.id,
        file_path: item.path,
        file_size: item.size,
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

  async remove(id) {

  }

  async details(id) {
    const Doc = this.getModel();
    const doc = await Doc.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: this.getModel('User'),
          as: 'publisher',
          required: false,
          attributes: ['name', 'id', 'avatar']
        },
        {
          model: this.getModel('DocAttach'),
          required: false,
          as: 'attach',
        }
      ]
    });

    if (!doc) {
      throw {
        code: Response.getErrorCode(),
        message: '没有该公文',
      }
    }

    const receiverTotal = await this.docReceiverTotal(id);
    const hasReadTotal = await this.docHasReadTotal(id);
    const unReadTotal = receiverTotal - hasReadTotal;

    doc.setDataValue('un_read_total', unReadTotal);
    doc.setDataValue('has_read_total', hasReadTotal);
    doc.setDataValue('receiver_total', receiverTotal);

    return doc;
  }

  async docReceiverTotal(id) {
    const DocReceivers = this.getModel('DocReceivers');
    return await DocReceivers.count({
      where: {
        doc_id: id,
      }
    });
  }

  async docHasReadTotal(id) {
    const DocReadReceipts = this.getModel('DocReadReceipts');
    return await DocReadReceipts.count({
      where: {
        doc_id: id,
      }
    })
  }

  async getUnreadDetails(id) {
    const DocReceivers = this.getModel('DocReceivers');
    const DocReadReceipts = this.getModel('DocReadReceipts');

    const allReaders = await DocReadReceipts.all({
      where: {
        doc_id: id,
      }
    });

    const allReaderIDs = allReaders.map(reader => {
      return reader.user_id;
    });

    let condition = {
      doc_id: id,
    }

    if (allReaderIDs.length > 0) {
      condition.receiver_id = {
        $notIn: allReaderIDs,
      }
    }

    const allUnreadReceivers = await DocReceivers.all({
      where: condition,
      include: [
        {
          model: this.getModel('User'),
          as: 'receiver',
          attributes: ['id', 'name', 'avatar'],
          include: [
            {
              model: this.getModel('Dept'),
              as: 'department',
            }
          ]
        }
      ]
    });

    const executedUnreadReceivers = {};
    allUnreadReceivers.forEach(item => {
      let dept = item.receiver.department;
      if (!executedUnreadReceivers[dept.id]) {

        executedUnreadReceivers[dept.id] = {
          receipts_id: item.id,
          dept_id: dept.id,
          dept_name: dept.dept_name,
          people: [],
          people_total: 0,
        };
      }

      executedUnreadReceivers[dept.id].people.push({
        id: item.receiver.id,
        name: item.receiver.name,
        avatar: item.receiver.avatar,
      });

      executedUnreadReceivers[dept.id].people_total += 1;
    });

    const result = [];

    for (let key in executedUnreadReceivers) {
      result.push(executedUnreadReceivers[key]);
    }

    return {
      result,
      resultMapper: executedUnreadReceivers,
    };
  }
}