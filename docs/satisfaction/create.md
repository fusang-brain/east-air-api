## 发起满意度调查接口（自定义）

### 接口调用说明

__请求地址 :__ [/satisfaction/create](#)

__请求方式 :__ POST

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|survey_subject|string|调查主题|yes|-|
|image|string|图片id|yes|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|


#### 请求示例

```json

{
	"survey_subject": "调查主题222",
	"image": "8294c640-dc38-43ff-898a-642c8e39fbca"
}

```

#### 返回示例

```json
{
    "code": 1000,
    "message": "创建成功",
    "data": {
        "survey": {
            "id": "e0e92574-143c-455a-9e28-4f73aa7e9d9a",
            "create_time": 1503467637724,
            "survey_subject": "调查主题222",
            "user_id": "ff84211c-c5c3-4a12-883e-18fd688ffad2",
            "is_system_survey": false,
            "state": 1,
            "survey_type": 1,
            "satisfaction_image": {
                "id": "90561551-464d-4118-93fc-c7e1a6b26aee",
                "file_id": "8294c640-dc38-43ff-898a-642c8e39fbca",
                "file_path": "/file/1503395866830-7s4m6ohj6de06gkn5qaor.png",
                "file_size": 14195,
                "survey_id": "e0e92574-143c-455a-9e28-4f73aa7e9d9a"
            }
        }
    }
}

```

* [返回索引](../readme.md)
