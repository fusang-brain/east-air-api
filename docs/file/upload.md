## 上传图片

### 接口调用说明

__请求地址 :__ 

  __上传活动图片__: [/file/upload/act_image](#)
  __上传活动附件__: [/file/upload/act_attach](#)

__请求方式 :__ POST

> 本接口用于上传活动图片, 本接口比较灵活，可根据自己平台进行灵活的使用.
上传接口需要使用 formdata 的格式上传

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|file|File 或者 Array<File>|图片或图片列表|是|分为两种模式，单图上传和多图上传，单图上传此字段直接放置一张图片即可，若是多图模式则上传一个图片列表|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 返回示例

```json

// 单图模式上传返回结果
{
    "code": 1000,
    "message": "文件上传成功",
    "data": {
        "file": {
            "id": "254b61b9-5bec-40de-b0f3-fc4aa2679c48",
            "filename": "1501238894472-s0izzz2vtqfs5pzsb2csor.png",
            "abs_path": "/home/alixez/workspace/Node/eastern-air-api/storage/origin/1501238894472-s0izzz2vtqfs5pzsb2csor.png",
            "path": "/file/1501238894472-s0izzz2vtqfs5pzsb2csor.png",
            "mimetype": "image/png",
            "size": 104221
        },
        "file_path": "/file/1501238894472-s0izzz2vtqfs5pzsb2csor.png"
    }
}

// 多图模式返回结果
{
    "code": 1000,
    "message": "文件上传成功",
    "data": {
        "files": [
            {
                "id": "69c7d112-9555-4dfc-afab-db45c6a92fe1",
                "filename": "1501239774924-c06dh3yghdb33ulzt7ta9k9.png",
                "abs_path": "/home/alixez/workspace/Node/eastern-air-api/storage/origin/1501239774924-c06dh3yghdb33ulzt7ta9k9.png",
                "path": "/file/1501239774924-c06dh3yghdb33ulzt7ta9k9.png",
                "mimetype": "image/png",
                "size": 104221
            },
            {
                "id": "6871af7c-a9fd-4301-9f8f-6fe60dfb924e",
                "filename": "1501239774927-r7biiw3aikfmemoo9r7ldi.png",
                "abs_path": "/home/alixez/workspace/Node/eastern-air-api/storage/origin/1501239774927-r7biiw3aikfmemoo9r7ldi.png",
                "path": "/file/1501239774927-r7biiw3aikfmemoo9r7ldi.png",
                "mimetype": "image/png",
                "size": 110837
            }
        ],
        "file_paths": [
            "/file/1501239774924-c06dh3yghdb33ulzt7ta9k9.png",
            "/file/1501239774927-r7biiw3aikfmemoo9r7ldi.png"
        ]
    }
}

```

* [返回索引](../readme.md)

