## {****}接口

### 接口调用说明

__请求地址 :__ [/sympathy/details](#)

__请求方式 :__ GET

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|慰问id|yes|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|


#### 返回示例

```json
{
    "code": 1000,
    "message": "查询成功",
    "data": {
        "details": {
            "id": "2fa69121-199e-40cb-baa4-5e902569168e",
            "reason": "",
            "dept_id": "2134a673-233d-4f3f-bc18-c68123ce1ea5",
            "user_id": "aee52788-3c41-441b-8cee-e6022f54d83f",
            "person": "lalal",
            "sympathy_date": "1502584106001",
            "sympathy_cost": "123.00",
            "sympathy_good_cost": "234.00",
            "sympathy_type": 1,
            "person_num": 2,
            "state": 1,
            "apply_time": "1502642702453",
            "note": null,
            "publisher": {
                "id": "aee52788-3c41-441b-8cee-e6022f54d83f",
                "name": "用户_8592",
                "avatar": ""
            },
            "department": {
                "id": "2134a673-233d-4f3f-bc18-c68123ce1ea5",
                "tree_level": 3,
                "parent": "21afde3e-5e11-4342-849a-cd561c22a919",
                "dept_name": "部门2"
            }
        },
        "flows": [
            {
                "name": "用户_8592",
                "avatar": "",
                "desc": "待审批",
                "time": null,
                "state": 0,
                "sort": 3
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
                "sort": 1
            },
            {
                "name": "用户_8592",
                "avatar": "",
                "desc": "发起申请",
                "time": "1502642702488",
                "state": 1,
                "sort": 0
            }
        ]
    }
}

```

* [返回索引](../readme.md)
