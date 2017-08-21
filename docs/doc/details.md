## 获取公文详情接口

### 接口调用说明

__请求地址 :__ [/doc/details](#)

__请求方式 :__ GET

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|公文ID|yes|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|details|dict|公文详情|yes|-|


#### 返回示例

```json

{
    "code": 1000,
    "message": "查询成功",
    "data": {
        "details": {
            "id": "a1deb352-d07a-41d5-bbe3-cc82a29a0901",
            "user_id": "fc4fd944-1715-4dcc-8a4b-bfdac53c92e7",
            "doc_title": "公文标题",
            "doc_type": "0",
            "doc_level": "general",
            "doc_note": "----",
            "create_time": "1503217970856",
            "publisher": {
                "name": "root",
                "id": "fc4fd944-1715-4dcc-8a4b-bfdac53c92e7",
                "avatar": ""
            },
            "attach": [
                {
                    "id": "a5337716-4edb-4db1-ae5c-89aa93e6399c",
                    "doc_id": "a1deb352-d07a-41d5-bbe3-cc82a29a0901",
                    "file_id": null,
                    "file_path": null,
                    "file_size": null
                }
            ],
            "un_read_total": 1,
            "has_read_total": 0,
            "receiver_total": 1
        }
    }
}

```

* [返回索引](../readme.md)
