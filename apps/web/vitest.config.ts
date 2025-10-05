import { mergeConfig } from 'vitest/config';
import baseConfig from '@repo/vitest-config/next';

export default mergeConfig(baseConfig, {
  // Adicione configurações específicas do projeto aqui se necessário
});
