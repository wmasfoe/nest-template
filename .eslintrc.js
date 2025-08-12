const { eslintConfig } = require('@tresdoce-nestjs-toolkit/commons');
const baseConfig = eslintConfig();

module.exports = {
  ...baseConfig,
  overrides: [
    ...(baseConfig.overrides || []),
    {
      files: ['apps/frontend/**/*.ts'],
      parserOptions: {
        project: [
          './apps/frontend/tsconfig.app.json',
          './apps/frontend/tsconfig.node.json',
        ],
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
