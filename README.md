# 基于 create-react-app / dva / antd 的 web 端脚手架

## 技术选型

- react@16.13
- dva@2.x
- antd@4.x
- dayjs
- less
- cssModule
- react-app-rewired

---

## 相关命令

**推荐使用 `yarn`**

- ### 安装依赖

  ```
  yarn    // 推荐使用
  npm install
  ```

- ### 本地运行

  ```
  yarn start
  npm run start
  ```

- ### 编译打包

  ```
  yarn build
  npm run build
  ```

- ### 打包分析

  ```
  yarn analyze
  npm run analyze
  ```

---

## 配置脚手架

- ### 本地代理 `proxy`

  前往 [`src/setupProxy.js`](./src/setupProxy.js) 中修改代理地址

- ### 配置别名

  前往 [`config-overrides.js`](./config-overrides.js) 中修改 `addWebpackAlias`

- ### 配置 `antd` 主题颜色

  > [参考文档](https://ant.design/docs/react/customize-theme-cn)

  前往 [`config-overrides.js`](./config-overrides.js) 中修改 `lessOptions` 中的 `modifyVars`

## 页面开发

- ### 新建页面

  前往 `src/pages/` 中新建页面

- ### 引入路由

  前往 [`src/router.js`](./src/router.js) 中引入路由

- ### 自定义组件

  前往 `src/components/` 中创建自定义组件
