/**
 * API 路由常量定义
 * 与后端配置和前端代理保持一致
 */

/**
 * API 配置常量
 */
export const API_CONFIG = {
  /** 基础路径，与后端 server.context 和前端代理配置一致 */
  BASE_PATH: '/api',
  /** API 版本配置 */
  VERSION: {
    V1: 'v1',
    V2: 'v2',
  },
  /** Swagger 文档路径 */
  SWAGGER_PATH: '/docs',
} as const;

/**
 * 路由路径常量
 * 避免前后端硬编码路径不一致
 */
export const ROUTES = {
  /** 认证相关路由 */
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile',
    FORCE_LOGOUT: (userId: number) => `/api/auth/force-logout/${userId}`,
    BLACKLIST_STATS: '/api/auth/blacklist-stats',
  },
  /** 用户相关路由 */
  USERS: {
    LIST: '/api/users',
    DETAIL: (id: number) => `/api/users/${id}`,
    CREATE: '/api/users',
    UPDATE: (id: number) => `/api/users/${id}`,
    DELETE: (id: number) => `/api/users/${id}`,
  },
  /** 应用根路由 */
  APP: {
    ROOT: '/',
    HEALTH: '/health',
    TEST_ENV: '/test-env',
    MY_UTIL: '/my-util',
    DEBUG_SENTRY: '/debug-sentry',
  },
} as const;

/**
 * 构建完整 API URL 的辅助函数
 */
export const buildApiUrl = (path: string, version?: string): string => {
  const basePath = API_CONFIG.BASE_PATH;
  if (version) {
    return `${basePath}/v${version}${path}`;
  }
  return `${basePath}${path}`;
};

/**
 * 构建 Swagger 文档 URL
 */
export const getSwaggerUrl = (): string => {
  return `${API_CONFIG.BASE_PATH}${API_CONFIG.SWAGGER_PATH}`;
};
