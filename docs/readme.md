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

#### 角色 & 权限

* [创建角色](./role/add_role.md)
* [获取角色详情](./role/details.md)
* [获取角色列表](./role/list_role.md)
* [修改角色](./role/list_role.md)
* [获取权限列表](./permissions/list.md)
