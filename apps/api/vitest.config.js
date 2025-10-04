import { mergeConfig } from 'vitest/config';
import baseConfig from '@repo/vitest-config/nest';

export default mergeConfig(baseConfig, {
  // Adicione configurações específicas do projeto aqui se necessário
});

