# nui-minisfc
用于测试效能工具开发的轻量级集成模板。

基于高性能 Web 框架 Sanic 与前端组件库 Naive UI 实现，主要提供了前端和后端的模板，结构清晰开箱即用。

非常适用于：单页或轻量级测试工具平台开发。

支持测试工具面向效能平台的凭据基于离线Ticket实现低成本对接（效能平台仅需根据协商的算法创建带Ticket的URL即可，后端会自动转换成无状态Token，适合安全性要求适中的内网场景），和更高安全要求的SSO对接。

由 Sanic 提供的生产就绪 Web 服务器，无需额外部署Nginx。

## 前端

- Vite
- Vue 3
- Pinia
- Vue Router
- Tailwind CSS

## 后端

- Sanic
- Swagger & Redoc
- Token-based JWT generator
- PostgreSQL & SQLAlchemy 2.0

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
  - 商定安全的加密算法和密钥存储方式（前端不得存储私钥），在原效能平台上做集成，用户跳转至子系统时带动态生成的离线令牌。
  - 修改`/api/v1/security/token`的实现，确保一致

3.新增菜单

修改`router.all.js`下菜单视图信息。

4.接口请求

支持SOAP等非REST统一返回结构体的协议，故axios默认返回到的是promise的实例，用户自行对结构体进行校验，这里不做统一校验。

`api`文件夹下进行API的声明。

5.开发规范

- 页面应当具备Loading状态防止重复提交
- 调用IT接口时应当增加防抖和节流，避免IT系统负载过高。
- 产生异常时，如必须用户处理，应当使用Modal而不是Message
- 用户提交的历史数据，应当持久化，防止刷新后重置。
