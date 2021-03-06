## 获取视频上传权鉴接口

### 接口调用说明

__请求地址 :__ [/vod/create_upload_video](#)

__请求方式 :__ POST

> 获取视频的阿里云上传权鉴和视频上传地址。

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|title|string|视频标题|yes|-|
|filename|string|文件名|yes|-|
|filesize|integer|文件尺寸|yes|文件的byte大小值|


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
