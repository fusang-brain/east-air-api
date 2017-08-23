/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */

import Service from './Service';
import Response from '../config/response'
export default class NotificationService extends Service {
  constructor () {
    super();
    this.modelName = 'Notification';
    this.template = {
      approval: {
        title: '需要您审批',
      },
      approval_success: {
        title: '审批通过',
      },
      approval_refuse: {
        title: '审批已被拒绝',
      },
      doc: {
        title: '需要您阅读',
      }
    }
  }

  async sendToPeople({title, body, sender, items, receivers, template}) {
    const msgTemplate = this.template[template];

    if (!msgTemplate) {
      throw {
        code: Response.getErrorCode(),
        message: '没有找到正确的消息模板',
      }
    }

    const executedReceivers = receivers.map(item => ({
        receiver_type: 'personal',
        receiver_id: item,
    }));

    title = `${title} ${msgTemplate.title}`;

    return await this.sendTo({title, body, sender, items, receivers: executedReceivers});
  }

  async sendToPersonal({title, body, sender, items, receiver, template}) {

    const msgTemplate = this.template[template];

    if (!msgTemplate) {
      throw {
        code: Response.getErrorCode(),
        message: '没有找到正确的消息模板',
      }
    }

    const receivers = [
      {
        receiver_type: 'personal',
        receiver_id: receiver,
      }
    ];

    title = `${title} ${msgTemplate.title}`;

    return await this.sendTo({title, body, sender, items, receivers});
  }

  async sendToDepartment({title, body, sender, items, department}) {
    const receivers = [
      {
        receiver_type: 'department',
        receiver_id: department,
      }
    ];

    return await this.sendTo({title, body, sender, items, receivers});
  }

  async sendTo({title, body, sender, items, receivers}) {
    const Notification = this.getModel();
    const values = {
      notify_type: 1,
      title,
      content: body,
      sender_id: sender,
    };

    if (items && Array.isArray(items)) {
      values.items = items;
    }

    if (receivers && Array.isArray(receivers)) {
      values.receivers = receivers;
    }

    return await Notification.create(values, {
      include: [
        {
          model: this.getModel('NotificationItems'),
          as: 'items',
        },
        {
          model: this.getModel('NotificationReceivers'),
          as: 'receivers',
        }
      ]
    })
  }

  async details(id, user_id, dept_id) {
    const Notification = this.getModel();
    const NotificationReaders = this.getModel('NotificationReaders');
    const notification = await Notification.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.getModel('NotificationReaders'),
          as: 'readers',
          required: false,
          where: {
            user_id: user_id
          }
        },
        {
          model: this.getModel('NotificationItems'),
          as: 'items',
          required: false,
        },
        {
          model: this.getModel('NotificationReceivers'),
          as: 'receivers',
          required: true,
          where: {
            $or: [
              {
                receiver_id: dept_id,
              },
              {
                receiver_id: user_id,
              }
            ],
          }
        }
      ]
    });

    if (!notification) {
      throw {
        code: Response.getErrorCode(),
        message: '您没有阅读该消息的权限',
      }
    }

    const reader = await NotificationReaders.findOne({
      where: {
        notify_id: notification.id,
        user_id: user_id,
      }
    });

    if (!reader) {
      await NotificationReaders.create({
        notify_id: notification.id,
        user_id: user_id,
        read_at: Date.now(),
      });
    }

    return {
      id: notification.id,
      notify_type: notification.notify_type,
      title: notification.title,
      content: notification.content,
      send_time: notification.send_time,
      items: notification.items,
    };
  }

  async notificationList(offset, limit, dept_id, user_id) {
    const Notification = this.getModel();
    const includeCondition = [
      {
        model: this.getModel('NotificationReaders'),
        as: 'readers',
        required: false,
        where: {
          user_id: user_id
        }
      },
      {
        model: this.getModel('NotificationItems'),
        as: 'items',
        required: false,
      },
      {
        model: this.getModel('NotificationReceivers'),
        as: 'receivers',
        required: true,
        where: {
          $or: [
            {
              receiver_id: dept_id,
            },
            {
              receiver_id: user_id,
            }
          ],
        }
      }
    ]

    const notifications = await Notification.all({
      offset,
      limit,
      order: [
        ['send_time', 'DESC']
      ],
      include: includeCondition,
    });

    const list = notifications.map(notification => {
      let item = {
        id: notification.id,
        notify_type: notification.notify_type,
        title: notification.title,
        content: notification.content,
        send_time: notification.send_time,
        items: notification.items,
      };

      item.has_read = false;
      console.log(notification.readers, '=====读者');

      if (Array.isArray(notification.readers) && notification.readers.length > 0) {
        item.has_read = true;
      }

      console.log(item);

      // const item = {...notification};

      // delete item.readers;
      // delete item.receivers;
      // return item;

      return item;
    });

    const total = await Notification.count({
      include: includeCondition,
    })

    return {
      total: +total,
      notifications: list,
    };
  }
}