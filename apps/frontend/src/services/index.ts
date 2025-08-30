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
