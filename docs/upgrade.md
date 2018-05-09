## 1. 获取近期更新

### 接口调用说明

__请求地址 :__ [/upgrade/recent](#)

__请求方式 :__ GET

> 获取最近的更新包信息

--------------------------------------


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
    "message": "获取成功",
    "data": {
        "id": "702c809d-defc-4b33-b67f-2bae91ac8022",
        "kind": "ios", // android or ios
        "version": "1.0.10", // 本次更新的版本号
        "filename": "itms-services://?action=download-manifest&url=http://mubjfgsgh.mubj-fxb.com/api/upgrade/ios>", // 更新的地址， 
        "create_at": "1525849264668",
        "update_at": "1525849264668"
    }
}

```



* [返回索引](../readme.md)
