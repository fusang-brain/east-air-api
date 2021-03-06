## 获取成员列表(app)

### 接口调用说明

__请求地址 :__ [/member/list_users](#)

__请求方式 :__ GET

> 获取成员列表

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|search|String|根据姓名搜索|否|若不传此字段则为显示所有用户|
|offset|Integer|数据偏移|否|缺省为0|
|limit|Integer|当前切片数据总数|否|缺省为20|

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
        "users": [
            {
                "id": "07711d9d-a3e2-402f-b2c9-a46a37735484",
                "name": "用户_8282",
                "avatar": ""
            },
            {
                "id": "1944e893-ebda-4929-a829-1a0d7c131f77",
                "name": "用户_8282",
                "avatar": ""
            },
            {
                "id": "1ff4c6a7-ce84-4a3c-99e0-6eab74a74227",
                "name": "root",
                "avatar": ""
            },
            {
                "id": "3f1eb027-d72b-443b-ae1f-597f8ef56299",
                "name": "王八蛋~~~",
                "avatar": ""
            },
            {
                "id": "54fe6164-e5c0-4004-acaa-d85b692f67bc",
                "name": "用户_8282",
                "avatar": ""
            },
            {
                "id": "70071be5-d249-49ee-a58e-4b71cd13a5f9",
                "name": "用户_8282",
                "avatar": ""
            },
            {
                "id": "ad5e8ab3-5ef1-4bb0-8f02-d13a62d0cd10",
                "name": "王八蛋",
                "avatar": ""
            },
            {
                "id": "b1cfb9eb-3809-4e7d-b83d-fb842d17e626",
                "name": "用户_8282",
                "avatar": ""
            },
            {
                "id": "dbe74285-a499-49c9-bea3-19b587780088",
                "name": "用户_8282",
                "avatar": ""
            },
            {
                "id": "ddbbeae2-2d90-4e0d-b083-0f78c85d72d4",
                "name": "用户_8282",
                "avatar": ""
            },
            {
                "id": "e1707c67-de5b-4475-88ec-9b55fa781c2a",
                "name": "用户_8282",
                "avatar": ""
            },
            {
                "id": "e78c0a0d-cb74-4cfc-9619-28c25d4a9051",
                "name": "用户_8282",
                "avatar": ""
            },
            {
                "id": "eb44a9d3-61a4-42a1-9819-19d5a1cdcda2",
                "name": "用户_8282",
                "avatar": ""
            }
        ]
    }
}

```

