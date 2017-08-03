## 获取审批详情接口

### 接口调用说明

__请求地址 :__ [/approval/details](#)

__请求方式 :__ GET

> 获取审批详情

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|approval_id|String|审批ID|是|-|


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
    "message": "查询成功",
    "data": {
        "approval": {
            "id": "e4458aed-3bf8-494f-a122-4ff46e7828a5",
            "approval_no": "2017080314242602",
            "approval_type": 1,
            "project_id": "3d06f4f3-bfb5-4a9c-9f40-559f86796c68",
            "publish_id": "80edbd4d-7586-40d0-981d-678c132af489",
            "publish_date": null,
            "result": null,
            "publisher": {
                "id": "80edbd4d-7586-40d0-981d-678c132af489",
                "name": "root",
                "avatar": ""
            },
            "project": {
                "id": "3d06f4f3-bfb5-4a9c-9f40-559f86796c68",
                "no": "2017080314242501",
                "act_type": 1,
                "subject": "主题",
                "purpose": "目的",
                "target": "活动对象",
                "address": "活动地点",
                "start_date": "1231313123123",
                "end_date": "1231313123",
                "process": "sadfasfasfasdf",
                "budget_total": "156.53",
                "integration": 1,
                "state": 1,
                "dept_id": null,
                "user_id": "80edbd4d-7586-40d0-981d-678c132af489",
                "grant_apply_id": "6e99143b-ef75-407d-90f5-f7faeee63590",
                "create_date": "1501741465658",
                "deleted": false
            },
            "flows": [
                {
                    "name": "root",
                    "avatar": "",
                    "desc": "发起申请",
                    "time": null,
                    "sort": 0
                },
                {
                    "name": "用户_8732",
                    "avatar": "",
                    "desc": "待审批",
                    "time": null,
                    "sort": 1
                },
                {
                    "name": "用户_8732",
                    "avatar": "",
                    "desc": "待审批",
                    "time": null,
                    "sort": 2
                },
                {
                    "name": "用户_8732",
                    "avatar": "",
                    "desc": "待审批",
                    "time": null,
                    "sort": 3
                },
                {
                    "name": "用户_8732",
                    "avatar": "",
                    "desc": "待审批",
                    "time": null,
                    "sort": 4
                }
            ]
        }
    }

```

* [返回索引](../readme.md)
