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

### TODO

基于 https://github.com/rudemex/nestjs-starter 二次开发

- [x] 数据库：mysql
- [x] ORM：prisma
- [x] 日志：winston + sentry
