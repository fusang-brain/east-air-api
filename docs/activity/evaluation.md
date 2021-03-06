## 1.活动评价接口

### 接口调用说明

__请求地址 :__ [/activity/evaluation](#)

__请求方式 :__ POST

> 评价某条活动

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|act_id|string|活动ID|是|-|
|result|boolean|评价结果|是|true: 满意 false: 不满意|
|content|string|评价内容|是|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 请求示例

```json
{
	"act_id": "5eb5556b-7930-43ba-ae7a-2db66f948b9f",
	"result": true,
	"content": "lalala,不错哦!"
}
```

#### 返回示例

```json
{
    "code": 1000,
    "message": "评价成功"
}

```

## 2.获取活动评价信息

### 接口调用说明

__请求地址 :__ [/activity/get_evaluation](#)

__请求方式 :__ GET

> 评价某条活动

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|act_id|string|活动ID|是|-|


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
    "message": "查看成功",
    "data": {
        "act_evaluation": {
            "user_id": "bca1e0a3-f9fd-4edd-8e94-7b73d06b4c31",
            "act_id": "5eb5556b-7930-43ba-ae7a-2db66f948b9f",
            "result": true,
            "content": "lalala,不错哦!"
        }
    }
}

// or

{
    "code": 1000,
    "message": "查看成功",
    "data": {
        "act_evaluation": null
    }
}

```


* [返回索引](../readme.md)
