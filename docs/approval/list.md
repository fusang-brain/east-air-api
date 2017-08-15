## 审批列表接口

### 接口调用说明

__请求地址(获取所有类型的审批 for app):__ [/approval/list/all](#)

__请求地址(获取活动审批列表):__ [/approval/list/act](#)

__请求地址(获取经费审批列表):__ [/approval/list/grant](#)

__请求方式 :__ GET

> 本接口在字段上做了抽象，各个平台根据抽象的结果酌情使用

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|state|string|筛选状态|no|all:全部 pending:待处理 success:已同意 failed:已拒绝 finished:已处理|
|search|string|搜索字段|no|-|
|offset|integer|-|no|-|
|limit|integer|-|no|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 列表_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|undo_total|integer|未读数|-|
|total|integer|总数|-|
|approval_list|array<dict>|审批列表|-|

_ approval_list _

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|project_subject|string|项目主题|no|-|
|project_type|integer|项目类型|no|-|
|project_type_string|string|项目类型展示|-|
|dept_name|string|部门名|-|
|total_amount|string|总金额|-|
|approval_type|integer|审批类型|-|
|approval_state|integer|审批状态|-|
|publish_date|string|发起日期|-|
|id|string|审批ID|-|


#### 返回示例

```json

{
    "code": 1000,
    "message": "查看成功",
    "data": {
        "undo_total": 2,
        "total": 2,
        "approval_list": [
            {
                "project_subject": "主题",
                "project_type": 1,
                "project_type_string": "文体活动",
                "dept_name": "部门2",
                "total_amount": "156.53",
                "approval_type": 1,
                "approval_state": 0,
                "publish_date": "1502782080232",
                "id": "89021b4b-3a32-4566-a7ea-c2778bacb669"
            },
            {
                "project_subject": "慰问困难、生病员工",
                "project_type": 9,
                "project_type_string": "慰问审批",
                "dept_name": "部门2",
                "total_amount": "12.50",
                "approval_type": 3,
                "approval_state": 0,
                "publish_date": "1502781926300",
                "id": "b0d13443-ab4b-45c6-8f09-a8da7bfad616"
            }
        ]
    }
}

```

* [返回索引](../readme.md)
