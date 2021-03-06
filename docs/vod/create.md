## 创建视频记录接口

### 接口调用说明

__请求地址 :__ [/vod/create](#)

__请求方式 :__ POST

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|title|string|点播媒体标题|否|-|
|vod_type|integer|点播媒体类型|否|0: 视频 1: 音频|
|category|integer|媒体分类|否|0: 分类1 ---- 4: 分类5|
|aliyun_video_id|string|阿里云的视频id|否|-|
|cover_id|string|文件的封面id|否|-|
|description|string|视频描述|否|-|


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

```

#### 返回示例

```json


```

* [返回索引](../readme.md)
