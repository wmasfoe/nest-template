# NestJS Passport认证系统使用指南

## 🎯 实现完成的功能

✅ **完整的Passport认证流程**  
✅ **JWT Token管理**  
✅ **用户登出功能**  
✅ **强制用户下线功能** (您最需要的功能！)  
✅ **Token黑名单机制**  
✅ **认证守卫保护**  

## 📋 API端点说明

### 1. 用户登录 (Passport方式)
```bash
POST /api/auth/login
Content-Type: application/json

{
  "account": "用户名",
  "password": "密码"
}

# 响应
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. 获取用户信息 (需要认证)
```bash
GET /api/auth/profile
Authorization: Bearer YOUR_TOKEN

# 响应
{
  "userId": 1,
  "name": "用户名",
  "email": "user@example.com"
}
```

### 3. 用户登出 (将token加入黑名单)
```bash
POST /api/auth/logout
Authorization: Bearer YOUR_TOKEN

# 响应
{
  "message": "Logged out successfully"
}
```

### 4. 强制用户下线 ⭐ (管理员功能)
```bash
POST /api/auth/force-logout/123
Authorization: Bearer ADMIN_TOKEN

# 响应
{
  "message": "User 123 has been forced to logout",
  "revokedTokens": 3
}
```

### 5. 查看黑名单统计 (管理员功能)
```bash
GET /api/auth/blacklist-stats
Authorization: Bearer ADMIN_TOKEN

# 响应
{
  "totalBlacklistedTokens": 15,
  "totalUsers": 5,
  "userTokenCounts": [
    {"userId": 1, "tokenCount": 2},
    {"userId": 2, "tokenCount": 1}
  ]
}
```

### 6. 兼容的登录方式
```bash
POST /api/auth/signin
Content-Type: application/json

{
  "account": "用户名", 
  "password": "密码"
}

# 响应
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🔒 认证流程说明

### Passport本地策略 (LocalStrategy)
- 验证用户名和密码
- 成功后返回用户信息
- 用于 `/auth/login` 端点

### JWT策略 (JwtStrategy) 
- 验证JWT token
- 检查token是否在黑名单中
- 用于保护需要认证的端点

## 🚀 强制下线机制

### 工作原理
1. **Token黑名单**: 使用内存Set存储被撤销的token
2. **用户映射**: 维护userId到token的映射关系
3. **自动清理**: token过期后自动从黑名单移除
4. **实时生效**: 用户的下次请求立即被拒绝

### 使用场景
- 🔨 **管理员踢人**: 强制特定用户下线
- 🔐 **安全事件**: 批量撤销可疑用户的访问权限
- 🎯 **精准控制**: 撤销特定token而不影响其他session

## 🧪 测试步骤

1. **启动应用**
   ```bash
   pnpm run start:dev
   ```

2. **创建测试用户** (如果还没有)
   ```bash
   POST /api/users
   {
     "name": "testuser",
     "email": "test@example.com", 
     "password": "password123"
   }
   ```

3. **测试登录**
   ```bash
   curl -X POST http://localhost:8080/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"account":"testuser","password":"password123"}'
   ```

4. **测试受保护的端点**
   ```bash
   curl -X GET http://localhost:8080/api/auth/profile \
   -H "Authorization: Bearer YOUR_TOKEN"
   ```

5. **测试强制下线**
   ```bash
   curl -X POST http://localhost:8080/api/auth/force-logout/1 \
   -H "Authorization: Bearer YOUR_TOKEN"
   ```

## ✨ 新增文件结构

```
src/common/auth/
├── strategies/
│   ├── local.strategy.ts      # 本地认证策略
│   └── jwt.strategy.ts        # JWT认证策略
├── guards/
│   ├── local-auth.guard.ts    # 本地认证守卫
│   └── jwt-auth.guard.ts      # JWT认证守卫(含黑名单检查)
├── services/
│   └── blacklist.service.ts   # Token黑名单服务
├── auth.service.ts            # 认证服务(已更新)
├── auth.controller.ts         # 认证控制器(已更新)
└── auth.module.ts            # 认证模块(已更新)
```

## 🎊 恭喜！

您现在拥有了一个完整的、基于NestJS官方Passport方案的认证系统，**完美解决了强制用户下线的需求**！

系统特点：
- ✅ 符合NestJS官方最佳实践
- ✅ 支持即时强制下线
- ✅ 内存高效的黑名单机制  
- ✅ 自动清理过期token
- ✅ 完整的日志记录
- ✅ 类型安全的TypeScript实现

试试看吧！🚀