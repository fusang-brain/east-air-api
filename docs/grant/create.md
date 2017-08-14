## 创建经审接口

### 接口调用说明

__请求地址(草稿) :__ [/grant/create/draft](#)

__请求地址(提交):__ [/grant/create/submit](#)

__请求方式 :__ POST

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|type|integer|经审类型|yes|1:慰问困难、生病员工 2:慰问一线员工 3:文体活动 4:疗养休费 5:培训费 6:会务费 7:固定资产 8:其他 0: 未知|
|dept_id|string|部门ID|no|-|
|cost|number|经费|yes|-|
|purpose|string|目的|yes|-|
|people_count|integer|yes|人数|-|
|others|string|其他|no|-|
|items|array<dict>|固定资产的项目|no|-|
|attach|array<string>|附件|no|数组的每一项为附件上传返回的 file_path|

_items_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|name|String|资产名称|是｜－｜
|price|Number|单价|是|－|
|count|Integer|数量|是|－|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|grant_apply|dict|经费申请|yes|-|


#### 请求示例

```json
{
	"type": 1,
	"cost": 12.5,
	"purpose": "目的",
	"people_count": 2,
	"others": "asdfasdf",
	"attach": [
	  "/safas/sdfasf/asdfasf"
	]
}
```

#### 返回示例

```json
{
    "code": 1000,
    "message": "创建成功",
    "data": {
        "grant_apply": {
            "id": "763a9b98-3452-49de-b960-9aa341b4aad9",
            "is_act": false,
            "type": 1,
            "cost": 12.5,
            "purpose": "目的",
            "people_count": 2,
            "others": "asdfasdf",
            "attach": [
                {
                    "id": "184b9a26-30ac-4a9c-a71e-bd89a0c6e982",
                    "no": "2017081416072601",
                    "file_path": "/safas/sdfasf/asdfasf",
                    "grant_application_id": "763a9b98-3452-49de-b960-9aa341b4aad9"
                }
            ],
            "state": 0,
            "dept_id": "2134a673-233d-4f3f-bc18-c68123ce1ea5",
            "user_id": "aee52788-3c41-441b-8cee-e6022f54d83f",
            "type_string": "慰问困难、生病员工"
        }
    }
}

```

* [返回索引](../readme.md)
