import * as neonServerless from '@neondatabase/serverless';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        neonServerless.neonConfig.pipelineConnect = 'password';

        return {
          type: 'postgres',
          url: configService.get<string>('DB_URL'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
          logging: configService.get<boolean>('DB_LOGGING', false),
          ssl: true,
          autoLoadEntities: true,
          // Passa o módulo @neondatabase/serverless como driver (substitui o pg)
          driver: neonServerless,
          extra: {
            // Pool pequeno para serverless (conexões são leves via WebSocket)
            max: 5,
            connectionTimeoutMillis: 10000,
            idleTimeoutMillis: 30000,
          },
        };

        // Configuração para desenvolvimento (usa driver padrão pg)
        return {
          type: 'postgres',
          url: configService.get<string>('DB_URL'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
          logging: configService.get<boolean>('DB_LOGGING', false),
          ssl: { rejectUnauthorized: false },
          autoLoadEntities: true,
          extra: {
            max: 10,
            connectionTimeoutMillis: 30000,
            idleTimeoutMillis: 30000,
            statement_timeout: 60000,
          },
          keepConnectionAlive: true,
          poolSize: 10,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
