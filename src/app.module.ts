import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService  } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChallengeModule } from './challenge/challenge.module';
import { PracticeModule } from './practice/practice.module';

@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }), TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // 배포가 아닐 때만 synchronize 활성화
        synchronize: configService.get<string>('NODE_ENV') !== 'production', 
      }),
    }), AuthModule, UserModule, ChallengeModule, PracticeModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
