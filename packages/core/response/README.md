# 统一返回结构系统

此系统提供了统一的API返回格式，确保所有接口都有一致的响应结构。

## 特性

- ✅ 统一成功响应格式
- ✅ 统一错误响应格式  
- ✅ 自动分页响应处理
- ✅ 业务层无感知开发
- ✅ 支持原有 NestJS 异常处理
- ✅ 集成 Sentry 异常监控

## 响应格式

### 成功响应
```json
{
  "data": {
    "user": "dapao",
    "email": "dapao@gmail.com"
  },
  "code": 200,
  "success": true,
  "message": "success"
}
```

### 分页响应
```json
{
  "data": {
    "tableResult": [
      { "user": "dapao", "email": "dapao@gmail.com" }
    ],
    "total": 1,
    "pageNum": 1,
    "pageSize": 10,
    "extra": {}
  },
  "code": 200,
  "success": true,
  "message": "success"
}
```

### 错误响应
```json
{
  "message": "用户不存在",
  "error": "Not Found",
  "code": 404,
  "data": [],
  "success": false
}
```

## 使用方式

### 基本用法

在控制器中直接返回数据，系统会自动包装：

```typescript
@Controller('users')
export class UsersController {
  
  @Get(':id')
  findOne(@Param('id') id: number) {
    // 直接返回数据，系统会自动包装
    return {
      user: 'dapao',
      email: 'dapao@gmail.com'
    };
  }
}
```

### 抛出异常

使用标准的 NestJS 异常即可：

```typescript
import { NotFoundException } from '@nestjs/common';

@Get(':id')
findOne(@Param('id') id: number) {
  if (!user) {
    throw new NotFoundException('用户不存在');
  }
  return user;
}
```

### 使用工具类（可选）

如果需要更多控制，可以使用 `ResponseUtils`：

```typescript
import { ResponseUtils } from '@packages/core/response';

@Get()
findAll() {
  const users = [...];
  return ResponseUtils.success(users, '获取用户列表成功');
}

@Get('error-example')
errorExample() {
  ResponseUtils.throwError('自定义错误信息', 400);
}
```

### 使用装饰器（可选）

如果需要显式标记分页接口：

```typescript
import { UnifiedPaginationResponseDecorator } from '@packages/core/response';

@Get()
@UnifiedPaginationResponseDecorator()
findAll() {
  // 返回分页数据
}
```

### 分页响应

系统会自动检测并转换分页格式。如果你使用的分页库返回 `{ data: [], meta: {...} }` 格式，系统会自动转换为统一的分页格式。

### Sentry 异常监控集成

系统已集成 Sentry 异常监控，所有异常都会自动记录到 Sentry，包含以下信息：

- **异常详情**: 完整的异常堆栈信息
- **请求上下文**: URL、HTTP 方法、用户代理、IP 地址
- **请求数据**: 查询参数、路径参数
- **标签**: 组件名称、请求路径、HTTP 方法

无需额外配置，异常监控功能自动生效。

## 技术实现

- **UnifiedResponseInterceptor**: 统一包装成功响应
- **UnifiedExceptionFilter**: 统一处理异常响应，集成 Sentry 异常监控
- **ResponseUtils**: 提供便捷的响应创建方法
- **ResponseModule**: 模块化封装，自动注册全局拦截器和过滤器

## 模块导入

### 在应用中使用

```typescript
import { ResponseModule } from '@packages/core/response';

@Module({
  imports: [ResponseModule], // ResponseModule 已在 CommonModule 中导入
})
export class AppModule {}
```

### 在业务代码中使用

```typescript
// 推荐：从 common 统一导入
import { ResponseUtils, BaseResponse } from '@packages/core';

// 或者：从具体模块导入  
import { ResponseUtils } from '@packages/core/response';
```

## 注意事项

1. 系统会自动检测已包装的响应，避免重复包装
2. 支持现有的 `@tresdoce-nestjs-toolkit/paas` 分页格式，无冲突
3. 保持与现有异常处理的兼容性  
4. ResponseModule 在 CommonModule 中自动导入，无需在业务模块中额外配置
5. 统一响应类型使用 `UnifiedPaginationResponse` 避免与toolkit的 `PaginationResponse` 冲突
6. **Sentry 集成**: 所有异常都会自动记录到 Sentry，保持完整的异常监控功能
