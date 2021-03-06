## 新增公文接口

### 接口调用说明

__请求地址 :__ [/doc/create](#)

__请求方式 :__ POST

> 提交一个公文

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|doc_title|string|公文标题|yes|-|
|doc_type|integer|公文类型|yes|-|
|doc_level|string|等级|yes|general:一般 important:重要 crash:紧急 top_secret:绝密|
|doc_note|string|公文备注说明|yes|-|
|receivers|array<string>|接受者ID|yes|-|
|attach|array<string>|附件id|yes|-|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|doc|dict|创建成功的文档|-|

#### 请求示例

```json



```

#### 返回示例

```json


```

* [返回索引](../readme.md)
