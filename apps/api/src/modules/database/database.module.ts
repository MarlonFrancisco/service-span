import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get<string>('DB_URL'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
          logging: configService.get<boolean>('DB_LOGGING', false),
          ssl: false,
          autoLoadEntities: true,
          extra: {
            max: 5,
            connectionTimeoutMillis: 10000,
            idleTimeoutMillis: 30000,
            statement_timeout: 60000,
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
