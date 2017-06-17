## 登录接口

### 接口调用说明

__请求地址 :__ [/member/dept/create](#)

__请求方式 :__ POST

> 本接口用于向系统登录，并请求JWT权鉴

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|mobile|String|登录账户的手机号|是|-|
|password|String|密码|是|需要使用Sha1进行哈希，并且转换为大写|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 请求示例

```json
{
	"mobile": 18627894264,
	"password": "7C4A8D09CA3762AF61E59520943DC26494F8941B"
}
```

#### 返回示例

```json

// 登录成功
{
    "code": 1000,
    "message": "登录成功!",
    "data": {
        "user": {
            "id": "02774c70-c7c8-441b-93cb-dacd67522667",
            "name": "其他",
            "birthday": "1497692633633",
            "card_num": "--",
            "mobile": "18627894264",
            "type": 0,
            "ehr": "",
            "state": 0,
            "other_status": 0,
            "gender": 0,
            "qq": "",
            "wechat": "",
            "degree": 0,
            "duties": "",
            "jobs": "",
            "exist_job_level": "",
            "now_job_level": "",
            "start_work_time": null,
            "join_time": null,
            "mark": "",
            "avatar": "",
            "integration": 0,
            "quit_time": null,
            "retire_time": null,
            "dept": null,
            "roles": 1,
            "deleted": false,
            "create_at": "1497692608715",
            "update_at": "1497694006158"
        },
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwMjc3NGM3MC1jN2M4LTQ0MWItOTNjYi1kYWNkNjc1MjI2NjciLCJjcmVhdGVfYXQiOjE0OTc2OTUxMDA1MDEsImV4dCI6e319.O0qxeTbIAyvorX5uznUXG419nF4X0ehBnowh5kexDpQ"
    }
}


```

