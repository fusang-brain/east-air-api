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

  /**
   * 发消息给人们
   * @param title    标题
   * @param body     消息体
   * @param sender   发送者
   * @param items    消息附加项目
   * @param receivers 接受者们
   * @param template  使用的消息模板
   * @returns {Promise.<*>}
   */
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

  /**
   * 发消息给某人
   * @param title 标题
   * @param body  消息体
   * @param sender 发送者
   * @param items  消息附加项目
   * @param receiver 接受者
   * @param template 模板
   * @returns {Promise.<*>}
   */
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

  /**
   * 发消息给某个部门（部门下的所有人）
   * @param title  标题
   * @param body   消息体
   * @param sender 发送人
   * @param items  附加项目
   * @param department 部门
   * @returns {Promise.<*>}
   */
  async sendToDepartment({title, body, sender, items, department}) {
    const receivers = [
      {
        receiver_type: 'department',
        receiver_id: department,
      }
    ];

    return await this.sendTo({title, body, sender, items, receivers});
  }

  /**
   * 给某个对象发消息
   * @param title  标题
   * @param body   消息体
   * @param sender 发送人
   * @param items  附加项目
   * @param receivers 接受者们
   * @returns {Promise.<*>}
   */
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

  /**
   * 获取通知详情
   * @param id        通知ID
   * @param user_id   用户ID
   * @param dept_id   部门ID
   * @returns {Promise.<{id, notify_type: (number|*|Notification.notify_type|{type}), title, content, send_time: (*|ActEvaluation.send_time|{type, defaultValue}|Notification.send_time), items}>}
   */
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

  /**
   * 获取消息通知列表
   * @param offset  数据偏移
   * @param limit   数据分页
   * @param dept_id 部门ID
   * @param user_id 用户ID
   * @returns {Promise.<{total: number, notifications}>}
   */
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


    const total = await Notification.count({
      include: includeCondition,
    })

    let unreadCount = total;

    // 格式化消息
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
      // console.log(notification.readers, '=====读者');

      if (Array.isArray(notification.readers) && notification.readers.length > 0) {
        item.has_read = true;
        unreadCount -= 1;
      }

      // console.log(item);

      // const item = {...notification};

      // delete item.readers;
      // delete item.receivers;
      // return item;

      return item;
    });


    console.log({
      total,
      unreadCount,
    })
    return {
      total: +total,
      unreadCount,
      notifications: list,
    };
  }

  async unreadCount(dept_id, user_id) {
    const Notification = this.getModel();
    const count = await Notification.count({
      include: [
        {
          model: this.getModel('NotificationReaders'),
          as: 'readers',
          required: true,
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
    })

    
    return count;
  }
}