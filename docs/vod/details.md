## 获取视频详情接口

### 接口调用说明

__请求地址 :__ [/vod/details](#)

__请求方式 :__ GET

> 获取视频详情。详情包含视频的阿里云播放地址视频的详情记录

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|视频记录id|yes|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|


```

#### 返回示例

```json
{
    "code": 1000,
    "message": "获取成功",
    "data": {
        "details": {
            "id": "35065a6c-370f-43cd-8afe-3cdc9c066016",
            "vod_type": 2,
            "category": 1,
            "aliyun_video_id": "38a1ccf2153a44fc8cb7023cbb3b6326",
            "cover_id": "7aed9a83-a8a2-4ae7-99a4-cd7dc0c0ca4c",
            "title": "sfasdf",
            "description": "asdfasdf",
            "enable": true,
            
            // 视频流信息
            "play_info": {
                "Format": "mp4",
                "StreamType": "video",
                "JobId": "918b679fe82a402cb00269c42c6214ae",
                "Duration": "189.2000",
                "Height": 540,
                "Encrypt": 0,
                "PlayURL": "http://mubjfgsgh.mubj-fxb.com/38a1ccf2153a44fc8cb7023cbb3b6326/4a2ab7c0ba1b4f3682ddc2b90b480c2f-5287d2089db37e62345123a1be272f8b.mp4",
                "Width": 960,
                "Fps": "25.0000",
                "Bitrate": "252.4780",
                "Definition": "LD",
                "Size": 8402788
            },
            
            // 视频基本信息
            "base_info": {
                "CreationTime": "2017-11-08T09:27:36Z",
                "CoverURL": "http://mubjfgsgh.mubj-fxb.com/snapshot/38a1ccf2153a44fc8cb7023cbb3b632600001.jpg",
                "Status": "Normal",
                "MediaType": "video",
                "VideoId": "38a1ccf2153a44fc8cb7023cbb3b6326",
                "Duration": "189.265",
                "Title": "sfasdf"
            }
        }
    }
}

```

* [返回索引](../readme.md)
