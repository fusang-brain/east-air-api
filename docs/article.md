## 1. 发布动态接口

### 接口调用说明

__请求地址 :__ [/article/create](#)

__请求方式 :__ POST

> 发布一个新的动态文章（图文/视频）

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|title|string|文章标题|是|-|
|category|UUID<String>|文章分类ID|是|-|
|groupID|UUID<String>|文章分组ID|是|这里的分组即一级分类, 目前可选值为（视频、其他）|
|description|string|动态描述|是|-|
|content|string|动态内容|否|-|
|videos|string|视频列表|否|视频列表内的每一项应该是正确的视频ID，视频ID是创建视频上传流时返回的 aliyun_video_id 。详情请见接口 [/vod/create_upload_video]|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|


#### 请求示例

```json

{
	"title": "带图片的文章",
	"category": "7408c1a0-71e7-419b-bc4e-e99e2fdee6ca",
	"groupID": "6f7c2781-524a-458e-86d6-a16e55fc01d3",
	"description": "desp",
	"content": "<p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p><p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p><p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p>",
	"videos": [
		"654a940935eb43a698b24ec046a7e926"
	]
}

```

#### 返回示例

```json


```

## 2. 发布分类接口

### 接口调用说明

__请求地址 :__ [/article/create_category](#)

__请求方式 :__ POST

> 发布一个新的动态分类目录

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|name|string|分类名|是|-|
|kind|string|分类类型|是|cate、group, 二级分类请使用 cate 类型创建分类|
|id_type|UUID<String>|标示类型|否|当 kind 为group时，该字段为必要, 用来标示分组唯一特性, 缺省值为 common|
|group|UUID<String>|分类归属组|否|当 kind 为cate时，该字段为必要|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|


#### 请求示例

```json
{
	"name": "追要闻",
  "kind": "cate",
  "group": "6f7c2781-524a-458e-86d6-a16e55fc01d3",
}
```

#### 返回示例

```json


```

## 3. 切换置顶状态接口

### 接口调用说明

__请求地址 :__ [/article/toggle_top](#)

__请求方式 :__ POST

> 置顶/取消置顶

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|UUID<String>|文章ID|是|-|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|


#### 请求示例

```json
{
	"id": "7ee46d9d-9761-46bf-8887-09796fa8d429"
}
```

#### 返回示例

```json
{
    "code": 1004,
    "message": "置顶成功"
}

```

## 4. 获取文章列表接口

### 接口调用说明

__请求地址 :__ [/article/list](#)

__请求方式 :__ GET

> 获取文章列表

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|offset|number|偏移量|是|-|
|limit|number|页数|是|-|
|title|string|标题|是|filter|
|date|number|日期|是|filter|
|group|string|分组ID|是|filter|
|category|string|分类ID|是|filter|

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
    "message": "获取列表成功",
    "data": {
        "total": 4,
        "list": [
            {
                "coverList": [],
                "id": "7ee46d9d-9761-46bf-8887-09796fa8d429",
                "title": "test article",
                "category": "7408c1a0-71e7-419b-bc4e-e99e2fdee6ca",
                "group_id": "6f7c2781-524a-458e-86d6-a16e55fc01d3",
                "description": "desp",
                "content": "dududud1111",
                "covers": null,
                "is_top": true,
                "is_read": true,
                "videos": [
                    {
                        "id": "654a940935eb43a698b24ec046a7e926",
                        "cover_url": null,
                        "file_url": null,
                        "duration": "0",
                        "finished": false,
                        "ArticleVideo": {
                            "id": "3b30bb75-1001-4cb5-a32f-ae579604c586",
                            "article_id": "7ee46d9d-9761-46bf-8887-09796fa8d429",
                            "video_id": "654a940935eb43a698b24ec046a7e926"
                        }
                    }
                ]
            },
            {
                "coverList": [
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png",
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png",
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png"
                ],
                "id": "08d4c82c-f28c-4b76-bd59-9be92602db40",
                "title": "带图片的文章",
                "category": "7408c1a0-71e7-419b-bc4e-e99e2fdee6ca",
                "group_id": "6f7c2781-524a-458e-86d6-a16e55fc01d3",
                "description": "desp",
                "content": "<p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p><p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p><p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p>",
                "covers": "[\"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png\",\"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png\",\"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png\"]",
                "is_top": false,
                "is_read": true,
                "videos": [
                    {
                        "id": "654a940935eb43a698b24ec046a7e926",
                        "cover_url": null,
                        "file_url": null,
                        "duration": "0",
                        "finished": false,
                        "ArticleVideo": {
                            "id": "df702f52-6050-4c53-a7d4-8d1d9cb40251",
                            "article_id": "08d4c82c-f28c-4b76-bd59-9be92602db40",
                            "video_id": "654a940935eb43a698b24ec046a7e926"
                        }
                    }
                ]
            },
            {
                "coverList": [],
                "id": "13830d2e-e5d2-4e2d-9989-40ca6a3dfbfa",
                "title": "test article",
                "category": "7408c1a0-71e7-419b-bc4e-e99e2fdee6ca",
                "group_id": "6f7c2781-524a-458e-86d6-a16e55fc01d3",
                "description": "desp",
                "content": "dududud",
                "covers": null,
                "is_top": false,
                "is_read": true,
                "videos": []
            },
            {
                "coverList": [],
                "id": "2db1d926-88b2-4b8c-881d-bb02220137a0",
                "title": "带图片的文章",
                "category": "7408c1a0-71e7-419b-bc4e-e99e2fdee6ca",
                "group_id": "6f7c2781-524a-458e-86d6-a16e55fc01d3",
                "description": "desp",
                "content": "<p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p><p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p><p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p>",
                "covers": null,
                "is_top": false,
                "is_read": true,
                "videos": [
                    {
                        "id": "654a940935eb43a698b24ec046a7e926",
                        "cover_url": null,
                        "file_url": null,
                        "duration": "0",
                        "finished": false,
                        "ArticleVideo": {
                            "id": "a61a137c-79b3-462f-974a-3b3fc293a9a3",
                            "article_id": "2db1d926-88b2-4b8c-881d-bb02220137a0",
                            "video_id": "654a940935eb43a698b24ec046a7e926"
                        }
                    }
                ]
            }
        ]
    }
}

```

## 5. 获取文章详情接口

### 接口调用说明

__请求地址 :__ [/article/details](#)

__请求方式 :__ GET

> 

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|UUID<String>|文章ID|是|-|

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
        "details": {
            "coverList": [
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png"
            ],
            "id": "08d4c82c-f28c-4b76-bd59-9be92602db40",
            "title": "带图片的文章",
            "category": "7408c1a0-71e7-419b-bc4e-e99e2fdee6ca",
            "group_id": "6f7c2781-524a-458e-86d6-a16e55fc01d3",
            "description": "desp",
            "content": "<p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p><p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p><p>jaidfjia</p><p class='ql-align-center'>sdfk </p><p class='ql-align-center'><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png'></p>",
            "covers": "[\"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png\",\"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png\",\"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525965671&di=5d77c21966d77354b1eaa7aaa3ab771b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1411%2F42%2F426b6e816975338ecdb.png_r_1024x683x95_183d8e53.png\"]",
            "is_top": false,
            "is_read": true
        }
    }
```

## 6. 获取所有分组接口

### 接口调用说明

__请求地址 :__ [/article/groups](#)

__请求方式 :__ GET

> 

--------------------------------------

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|


#### 返回示例

```json
  {
    "code": 1000,
    "message": "获取成功",
    "data": {
        "groups": [
            {
                "id": "39e1f6e7-f1a0-4810-968d-dbf859c4963d",
                "name": "视频",
                "id_type": "video",
                "unReadCount": 0
            },
            {
                "id": "6f7c2781-524a-458e-86d6-a16e55fc01d3",
                "name": "新闻",
                "id_type": "common",
                "unReadCount": 0
            }
        ]
    }
  }
```

## 7. 获取所有分类接口

### 接口调用说明

__请求地址 :__ [/article/categories](#)

__请求方式 :__ GET

> 

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|group|String|文章ID|是|-|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|


#### 返回示例

```json
  {
    "code": 1000,
    "message": "获取成功",
    "data": {
        "categories": [
            {
                "id": "7408c1a0-71e7-419b-bc4e-e99e2fdee6ca",
                "name": "追要闻",
                "group": "39e1f6e7-f1a0-4810-968d-dbf859c4963d"
            }
        ]
    }
  }
```

* [返回索引](../readme.md)
