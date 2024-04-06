# nui-minisfc
用于测试效能工具开发的轻量级集成模板。

基于高性能 Web 框架 Sanic 与前端组件库 Naive UI 实现，主要提供了前端和后端的模板，结构清晰开箱即用。

非常适用于：单页或轻量级测试工具平台开发。

支持测试工具面向效能平台的凭据基于静态加密Ticket实现低成本对接（效能平台仅需根据协商的算法创建带Ticket的URL即可，后端会自动转换成无状态Token，适合安全性要求适中的内网场景），和更高安全要求的SSO对接。

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
