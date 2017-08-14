## 获取经审详情接口

### 接口调用说明

__请求地址 :__ [/grant/details](#)

__请求方式 :__ GET

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|经审ID|yes|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|details|dict|经审详情|yes|-|
|flows|array<dict>|审批流程|yes|同活动审批流程|

_details_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|type|integer|经审类型|yes|1:慰问困难、生病员工 2:慰问一线员工 3:文体活动 4:疗养休费 5:培训费 6:会务费 7:固定资产 8:其他 0: 未知|
|type_string|string|经审类型描述|yes|-|
|cost|string|经费|yes|-|
|purpose|string|目的|yes|-|
|people_count|string|人数|yes|-|
|others|string|其他|yes|-|
|state|integer|状态|yes|0:草稿 1:待审批 2:已通过 3:未通过 4:未知|
|apply_time|string|申请时间|yes|-|
|is_act|boolean|是否附属于活动|yes|-|
|items|array<dict>|固定资产详情|yes|-|
|attach|array<dict>|附件|yes|-|
|dept|dict|发起部门|yes|-|
|publisher|dict|发起人|yes|-|


#### 返回示例

```json
{
    "code": 1000,
    "message": "获取成功",
    "data": {
        "details": {
            "id": "99e5bdf4-36f1-45f6-b863-0f7dd981b92f",
            "type": 1,
            "type_string": "慰问困难、生病员工",
            "dept_id": "2134a673-233d-4f3f-bc18-c68123ce1ea5",
            "user_id": "aee52788-3c41-441b-8cee-e6022f54d83f",
            "cost": "12.50",
            "purpose": "目的",
            "people_count": 2,
            "others": "asdfasdf",
            "state": 1,
            "apply_time": null,
            "is_act": false,
            "items": [],
            "attach": [
                {
                    "id": "10c8870c-cc82-4371-8290-7f7f797ec99b",
                    "grant_application_id": "99e5bdf4-36f1-45f6-b863-0f7dd981b92f",
                    "no": "2017081400230901",
                    "file_path": "/safas/sdfasf/asdfasf"
                }
            ],
            "dept": {
                "id": "2134a673-233d-4f3f-bc18-c68123ce1ea5",
                "tree_level": 3,
                "parent": "21afde3e-5e11-4342-849a-cd561c22a919",
                "dept_name": "部门2"
            },
            "publisher": {
                "id": "aee52788-3c41-441b-8cee-e6022f54d83f",
                "name": "用户_8592",
                "avatar": ""
            }
        },
        "flows": [
            {
                "name": "用户_8592",
                "avatar": "",
                "desc": "发起申请",
                "time": "1502641389552",
                "state": 1,
                "sort": 0
            },
            {
                "name": "用户_8592",
                "avatar": "",
                "desc": "待审批",
                "time": null,
                "state": 0,
                "sort": 1
            },
            {
                "name": "用户_8592",
                "avatar": "",
                "desc": "待审批",
                "time": null,
                "state": 0,
                "sort": 2
            },
            {
                "name": "用户_8592",
                "avatar": "",
                "desc": "待审批",
                "time": null,
                "state": 0,
                "sort": 3
            }
        ]
    }
}

```

* [返回索引](../readme.md)
