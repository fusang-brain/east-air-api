## 获取活动列表

### 接口调用说明

__请求地址 :__ [/activity/list](#)

__请求方式 :__ GET

> 获取活动列表。包括列表搜索和筛选。

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|search|string|搜索|是|通过活动主题左右搜索|
|state|string|活动状态筛选|是|0:草稿 1:待审批 2:已通过 3:未通过|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 返回示例

```json

// for pc
{
    "code": 1000,
    "message": "查询成功",
    "data": {
        "list": [
            {
                "no": "2017072915225801",
                "id": "cb517c90-7fbc-4982-b363-8b8b19a55838",
                "subject": "主题asdfasdfasdfasdf",
                "act_type": 1,
                "create_date": "1501312978832",
                "state": 0, // 0:草稿 1:待审批 2:已通过 3:未通过
                "publisher": {
                    "id": "4d8c87b4-9d76-44c6-a09a-62a66a9d7150",
                    "name": "root",
                    "avatar": ""
                },
                "department": null
            }
        ]
    }
}

// for app
{
    "code": 1000,
    "message": "查询成功",
    "data": {
        "total": 4,
        "list": [
            {
                "no": "2017081522121201",
                "id": "99a77ea2-30be-4e0d-bfcd-f4152897f7dc",
                "subject": "主题",
                "act_type": 1,
                "create_date": "1502806332486",
                "state": 1,
                "start_date": "1231313123123",
                "end_date": "1231313123",
                "process": "sadfasfasfasdf",
                "publisher": {
                    "id": "39532551-19b2-4343-b56d-735f14f7c765",
                    "name": "用户_5462",
                    "avatar": ""
                },
                "department": {
                    "id": "590cd5cc-f9e4-4dbb-8ad1-36aa39e15fea",
                    "dept_name": "部门2"
                },
                "is_end": true,            // 是否已结束
                "has_evaluation": false    // 是否已评价
            },
            ...
        ]
    }
}
```

* [返回索引](../readme.md)

