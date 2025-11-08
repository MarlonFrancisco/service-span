import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isDevelopment =
          configService.get<string>('NODE_ENV') === 'development';

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_DATABASE', 'service_snap'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
          logging: configService.get<boolean>('DB_LOGGING', false),
          ssl: isDevelopment ? { rejectUnauthorized: false } : false,
          autoLoadEntities: true,
          cache: true,
          // Connection settings (ajustado por ambiente)
          extra: {
            max: isDevelopment ? 10 : 1, // Mais conexões em dev, 1 em prod (serverless)
            connectionTimeoutMillis: isDevelopment ? 30000 : 10000, // 30s em dev, 10s em prod
            idleTimeoutMillis: isDevelopment ? 30000 : 10000, // 30s em dev, 10s em prod
            statement_timeout: isDevelopment ? 60000 : 10000, // 60s em dev, 10s em prod
          },
          keepConnectionAlive: isDevelopment, // Mantém conexão viva em dev
          poolSize: isDevelopment ? 10 : 1,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
