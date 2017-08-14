## 概述

### 数据库统一说明

* 所有的时间字段都为字符串类型. （Unix 时间戳 或者大家也称之为时间毫秒数）
* 所有的关联字段你可以忽略，后台会做关联处理的。如果接口不小心返回了关联字段，请主动忽略。

### 接口统一说明

__接口设计没有采用现在比较流行的RESTAPI设计方式, 虽然它有很多优点, 但是本项目没必要去使用它__

#### 关于 HTTP Request Method

所有的接口设计仅仅使用HTTP协议的两种请求方式 (POST/GET)。 接口设计最大的原则是，
每当当前接口对服务器上的数据进行了更改的时候需要用POST方式，而相反的当当前接口只是做数据查询操作的时候
请求方式自然就是GET。

#### 关于参数传递

所有接口的数据传输都采用JSON。 当客户端需要向服务器POST数据的时候，开发者需要将数据以JSON对象的方式
放到Http的Body里面。而GET方式的话就只需要通过GET Params方式去传参就OKay。下面以前端使用axios进行网络
请求为例，做个描述
```javascript

// GET
async () => {
  const resp = await axios.get('http://localhost:3090/auth/login?param1=123&param2=1234');
  
  ...
}

// POST
async () => {
  const resp = await axios.post('http://localhost:3090/auth/login', {
    param1: '123',
    param2: 1234,
  })
  
  ...
}
```

#### 关于API认证

接口授权认证统一采用 JWT 权鉴认证。 因此，调用除登录接口的其他接口之前，你都需要使用用JWT权鉴。JWT权鉴
可以在调用登录接口时获得。
那么获取到的 access_token 怎么用呢？当你调起除登录以外的其他接口时需要将你在登录接口获得到的 access_token 
放到每次请求的 HTTP Headers 里面。
```
// 这里只是伪代码，每个平台的方法各不相同
setHeaders('X-ACCESS-TOKEN', access_token)
```
web端切记，通过登录接口获取到的access_token, 只能放在local_storage 或这 WEB SQL中做本地持久化。不可以使用类似于
Cookie的不安全存储方式。或者，也可以不做本地存储，而仅仅放在内存中，这样可以提高程序的相对安全性。

**由于相同的接口在WEB端和APP端可能存在不同的业务逻辑实现。**因此每个接口的调用需要一个平台flag, 做平台区分。和access_token用法一样。
每个接口的调用需要在HTTP Headers中放置参数 EA-DEVICE : app/pc
```
// for pc 
setHeaders('EA-DEVICE', 'pc')

// for app
setHeaders('EA-DEVICE', 'app')
```

## 接口索引

#### 认证模块

* [登录接口](./auth/login.md)
* [忘记密码](./auth/forget_password.md)
* [修改密码(App端 忘记密码后置操作)](./auth/reset_password.md)

#### 会员管理模块

* [获取工会列表接口](./memberManager/dept_list.md)
* [创建工会](./memberManager/dept.md)
* [修改工会](./memberManager/dept_update.md)
* [删除工会](./memberManager/dept_remove.md)
* [新增会员](./memberManager/create.md)
* [修改会员信息](./memberManager/update.md)
* [标记会员](./memberManager/mark_status.md)
* [获取会员列表](./memberManager/list.md)
* [获取成员列表(for app)](./memberManager/user_list.md)
* [获取会员详情](./memberManager/details.md)

#### 角色 & 权限

* [创建角色](./role/add_role.md)
* [获取角色详情](./role/details.md)
* [获取角色列表](./role/list_role.md)
* [修改角色](./role/update_role.md)
* [获取权限列表](./permissions/list.md)

#### 文件

* [文件上传](./file/upload.md)

#### 用户(我的)

* [获取我的信息](./user/info.md)
* [更新我的信息](./user/update.md)
* [修改密码](./user/reset_password.md)

#### 活动

* [发起活动](./activity/publish.md)
* [修改活动](./activity/update.md)
* [删除活动](./activity/remove.md)
* [查看活动列表](./activity/list.md)
* [活动详情](./activity/details.md)
* [活动评价](./activity/evaluation.md)

#### 审批

* [审批详情](./approval/details.md)
* [审批处理](./approval/execute.md)
* [代办审批数](./approval/wait_count.md)
* [获取审批流程模板](./approval/get_flow_temp.md)

#### 疗休养

* [发起疗休养](./relax_action/create.md)
* [疗休养详情](./relax_action/details.md)
* [疗休养列表](./relax_action/list.md)
* [疗休养删除](./relax_action/remove.md)
* [疗休养修改](./relax_action/update.md)

#### 慰问

* [发起慰问](./sympathy/create.md)
* [慰问详情](./sympathy/details.md)
* [慰问列表](./sympathy/list.md)
* [慰问删除](./sympathy/remove.md)
* [慰问更新](./sympathy/update.md)

#### 统计分析

* [疗休养统计结果](./statistics/relax_action.md)
* [慰问统计结果](./statistics/sympathy.md)
* [获取导出Token](./export_doc/get_token.md)
* [疗休养、慰问统计导出](./export_doc/statistics.md)

#### 经审

* [发起](./grant/create.md)
* [详情](./grant/details.md)
* [列表](./grant/list.md)
* [删除](./grant/remove.md)
* [更新](./grant/update.md)

