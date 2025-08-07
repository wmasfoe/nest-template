## 概览

环境要求：

- Node.js 20+
- pnpm 9+
- MySQL 8.0+

### 启动开发环境

新建 `.env.development` 文件，并配置相关环境变量，例子可参考 `.env.example`

关键配置：

- `DATABASE_URL` 数据库连接字符串
  - root: 数据库用户名
  - password: 数据库密码
  - dbname: 连接的数据库名称
- `SWAGGER_ENABLED` 是否启用 Swagger（线上false）

安装依赖：

```sh
pnpm install
```

初始化数据库：

```sh
# 第一次启动项目时执行
npm run prisma:migrate:dev --init dbname # dbname 和你 .env 的配置要一致
# 后续更改 prisma 模型后执行
npm run prisma:migrate:dev
```

启动项目：

```sh
pnpm start:dev
```

安装 NestCLI（可选）：

```sh
pnpm install -g @nestjs/cli
```

### TODO

基于 https://github.com/rudemex/nestjs-starter 二次开发

- [x] 数据库：mysql
- [x] ORM：prisma
- [x] 日志：winston + sentry

## 快速上手

### 目录约定

- 业务模块：`src/modules`
- 公共模块：`src/common`
- 配置：`src/config`
- 工具：`src/utils`
- 测试：`src/test`

> 所有的业务模块都放在 `src/modules` 目录下，举个例子，用户模块的目录结构如下：

```
src/modules/users/
├── dtos
├── controllers
├── services
├── entities
├── dtos
```

NestCLI 提供了一些命令，可以快速生成一些文件，常用的有：

```sh
# 生成一个资源
nest g resource users

# 生成一个模块
nest g module users

# 生成一个控制器
```
