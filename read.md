# nui-minisfc

用于测试效能工具开发的轻量级集成模板。

## 前端

- Vite
- Vue 3
- Pinia
- Vue Router
- Tailwind CSS
- mitt

## 后端

- Sanic
- Swagger & Redoc
- PostgreSQL & SQLAlchemy 2.0

## 中间件

- jenkins

## 开发说明

1.首先定义项目前端数据。

- 替换 `vite.config.ts` 内的相关信息；
- 替换`PageHeader`的标题。

2.确定鉴权方式

- 通过LDAP鉴权，可以自行修改`authenticate`下的鉴权方式。
  - 改造路由前置守卫`router.js`，去除redirect的相关逻辑
  - 增加后端用户鉴权接口
  - 增加前端登录视图
  - 完成前端登录视图和后端联调（后续本项目会默认支持自主鉴权和静态token鉴权两个模式，免去登录视图和后端的开发）
- 通过SSO鉴权
  - 改造路由前置守卫`router.js`，根据SSO的设计进行改造
- 通过静态Token鉴权
  - 商定安全的加密算法和密钥存储方式（前端不要存储私钥），在原效能平台上做集成，用户跳转至子系统时带动态生成的离线令牌。
  - 修改`/api/v1/security/token`的实现，确保一致
- 免鉴权
  - 修改`router.js`，去除重定向功能
  - 修改`PageHeader`组件，去除头像获取和部门展示、退出功能；去除`$subscribe`和`onMounted`的用户信息初始化逻辑
 - 通过微前端实现
  - 目前不稳定，自行参考改造。

3.新增菜单

- 修改`router.js`下菜单视图信息，key与路由name保持一致。
- 修改`PageHeader`组件下的MenuOptions，新增菜单入口

4.接口请求

支持SOAP等非REST统一返回结构体的协议，故axios默认返回到的是promise的实例，用户自行对结构体进行校验，这里不做统一校验。

`api`文件夹下进行API的声明。