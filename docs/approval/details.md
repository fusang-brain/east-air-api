## 获取审批详情接口

### 接口调用说明

__请求地址 :__ [/approval/details](#)

__请求方式 :__ GET

> 获取审批详情
字段中返回的project是审批包含的项目详情。项目详情的具体字段根据审批类别的不同返回的结构也不相同。

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
            "id": "b0d13443-ab4b-45c6-8f09-a8da7bfad616",
            "approval_no": "2017081515252602",
            "approval_type": 3,  // 1: 活动 2：慰问 3：经费
            "project_subject": "慰问困难、生病员工",
            "project_type": 9,
            "dept_id": "590cd5cc-f9e4-4dbb-8ad1-36aa39e15fea",
            "total_amount": "12.50",
            "project_id": "dfc7ba29-528e-4b73-aeb0-3a11f49ccd0f",
            "publish_id": "39532551-19b2-4343-b56d-735f14f7c765",
            "publish_date": "1502781926300",
            "result": null,
            "publisher": {
                "id": "39532551-19b2-4343-b56d-735f14f7c765",
                "name": "用户_5462",
                "avatar": ""
            },
            "flows": [
                {
                    "name": "用户_5462",
                    "avatar": "",
                    "desc": "发起申请",
                    "time": "1502781926300",
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
            "project": {
                "id": "dfc7ba29-528e-4b73-aeb0-3a11f49ccd0f",
                "type": 1,
                "type_string": "慰问困难、生病员工",
                "dept_id": "590cd5cc-f9e4-4dbb-8ad1-36aa39e15fea",
                "user_id": "39532551-19b2-4343-b56d-735f14f7c765",
                "cost": "12.50",
                "purpose": "目的",
                "people_count": 2,
                "others": "asdfasdf",
                "state": 1,
                "apply_time": "1502781926200",
                "is_act": false,
                "items": [],
                "attach": [
                    {
                        "id": "ba8ff245-b003-46eb-83b3-9a88c389db63",
                        "grant_application_id": "dfc7ba29-528e-4b73-aeb0-3a11f49ccd0f",
                        "no": "2017081515252601",
                        "file_path": "/safas/sdfasf/asdfasf"
                    }
                ],
                "dept": {
                    "id": "590cd5cc-f9e4-4dbb-8ad1-36aa39e15fea",
                    "tree_level": 3,
                    "parent": "8881cf87-cfbc-4930-b11e-0ac6a0584a01",
                    "dept_name": "部门2"
                },
                "publisher": {
                    "id": "39532551-19b2-4343-b56d-735f14f7c765",
                    "name": "用户_5462",
                    "avatar": ""
                }
            }
        }
    }
}
```

* [返回索引](../readme.md)
