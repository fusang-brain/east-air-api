## 接受者接口

### 接口调用说明

__请求地址 :__ [/doc/receivers](#)

__请求方式 :__ GET

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|公文id|yes|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|receivers|dict|未读接收者详情|yes|-|


#### 返回示例

```json
{
    "code": 1000,
    "message": "查询成功",
    "data": {
        "receivers": [
            {
                "id": "9269ec2a-09e1-4673-95ea-7c11415f4a18",
                "tree_level": 2,
                "parent": "21af1488-6824-4b93-9919-f16b38290bcb",
                "dept_name": "飞行部分会",
                "children": [
                    {
                        "id": "bad6614a-4a04-4bcb-b372-45dbaf16b4d7",
                        "tree_level": 3,
                        "parent": "9269ec2a-09e1-4673-95ea-7c11415f4a18",
                        "dept_name": "部门2",
                        "children": [],
                        "members": [
                            {
                                "id": "0968388f-503d-494c-8ab9-65770a30ac55",
                                "name": "用户5760",
                                "avatar": ""
                            }
                        ],
                        "member_total": 1
                    }
                ],
                "members": [],
                "member_total": 1
            },
            {
                "id": "0460bd2b-1cd9-4165-b9a9-ef364eb9c75a",
                "tree_level": 2,
                "parent": "21af1488-6824-4b93-9919-f16b38290bcb",
                "dept_name": "客舱部分会",
                "children": [],
                "members": [],
                "member_total": 0
            },
            ...
        ]
    }
}

```

* [返回索引](../readme.md)
