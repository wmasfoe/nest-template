/**
 * 通用业务枚举定义
 * 避免前后端魔法字符串
 */

/**
 * 性别枚举
 */
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

/**
 * 资历等级枚举
 */
export enum Seniority {
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
  LEAD = 'lead',
}

/**
 * 性别标签映射
 */
export const GenderLabels: Record<Gender, string> = {
  [Gender.MALE]: '男',
  [Gender.FEMALE]: '女',
  [Gender.OTHER]: '其他',
};

/**
 * 资历等级标签映射
 */
export const SeniorityLabels: Record<Seniority, string> = {
  [Seniority.JUNIOR]: '初级',
  [Seniority.MIDDLE]: '中级',
  [Seniority.SENIOR]: '高级',
  [Seniority.LEAD]: '专家',
};
