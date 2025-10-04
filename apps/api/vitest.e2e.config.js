import { mergeConfig } from 'vitest/config';
import baseConfig from '@repo/vitest-config/nest';

export default mergeConfig(baseConfig, {
  test: {
    include: ['**/*.e2e-spec.ts'],
  },
});

