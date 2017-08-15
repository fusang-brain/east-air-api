## 获取活动详情

### 接口调用说明

__请求地址 :__ [/activity/details](#)

__请求方式 :__ GET

> 获取活动详情。

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|act_id|string|活动ID|是|-|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 返回示例

```json
{
    "code": 1000,
    "message": "获取详情成功",
    "data": {
        "act": {
            "id": "cb517c90-7fbc-4982-b363-8b8b19a55838",
            "no": "2017072915225801",
            "act_type": 1,
            "subject": "主题asdfasdfasdfasdf",
            "purpose": "目的",
            "target": "活动对象",
            "address": "活动地点",
            "start_date": "1231313123123",
            "end_date": "1231313123",
            "process": "sadfsadfsadfsadfsdfsdfsadfsadfsadf",
            "budget_total": "247.04",
            "integration": 1,
            "state": 0,
            "dept_id": null,
            "user_id": "4d8c87b4-9d76-44c6-a09a-62a66a9d7150",
            "grant_apply_id": "dbae5f6e-1e41-4ed5-a38a-4f11f7a28148",
            "create_date": "1501312978832",
            "deleted": false,
            "publisher": {
                "id": "4d8c87b4-9d76-44c6-a09a-62a66a9d7150",
                "name": "root",
                "avatar": ""
            },
            "department": null
        }，
        "approval_flow": [
           {
               "name": "用户_5462",
               "avatar": "",
               "desc": "发起申请",
               "time": "1502806332662",
               "state": 1,
               "sort": 0
           },
           {
               "name": "用户_5462",
               "avatar": "",
               "desc": "待审批",
               "time": null,
               "state": 0,
               "sort": 1
           },
           {
               "name": "用户_5462",
               "avatar": "",
               "desc": "待审批",
               "time": null,
               "state": 0,
               "sort": 2
           },
           {
               "name": "用户_5462",
               "avatar": "",
               "desc": "待审批",
               "time": null,
               "state": 0,
               "sort": 3
           }
       ],
       "evaluations": [
           {
             "result": false,
             "content": "评价结果",
             "publisher": {
                 "name": "姓名",
                 "id": "...",
                 "avatar": "",
             }
           },
           ...
       ] // 评价
    }
}
```

* [返回索引](../readme.md)

