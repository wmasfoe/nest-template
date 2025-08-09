// List of environments
const environments = {
  test: '.env.test',
  dev: '.env.development',
  qa: '.env.qa',
  stg: '.env.stg',
  production: '.env',
};

export const getEnvFilePath = (): string => environments[`${process.env.NODE_ENV}`];
