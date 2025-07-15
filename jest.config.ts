import { jestConfig } from '@tresdoce-nestjs-toolkit/commons';
import type { Config } from 'jest';
import * as dotenv from 'dotenv';

process.env.NODE_ENV = 'test';

dotenv.config({
  path: '.env.test',
});

const config: Config = {
  ...jestConfig(),
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '^@app$': '<rootDir>/src',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@config$': '<rootDir>/src/config',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@utils$': '<rootDir>/src/utils',
  },
  //globalSetup: './jest.globalSetup.ts',
  //globalTeardown: './jest.globalTeardown.ts',
};

export default config;
