import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

// import { TwitterValidationService } from './twitter-validation/twitter-validation.service';
// import { TwitterValidationModule } from './twitter-validation/twitter-validation.module';
// import { HttpModule, HttpService } from '@nestjs/axios';
// import { MongooseModule } from '@nestjs/mongoose';
// import { modelDefs } from './database/schemas';
import { DuneValidationModule } from './dune-validation/dune-validation.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables globally accessible
    }),
    ScheduleModule.forRoot(), // Runs the cron globally
    CacheModule.registerAsync({
      imports: [ConfigModule], // Ensures ConfigService is available
      useFactory: async (configService: ConfigService) => ({
        store: (await redisStore).redisStore, // Fix store usage
        host: configService.get<string>('REDIS_HOST', 'localhost'),
        port: configService.get<number>('REDIS_PORT', 6379),
        password: configService.get<string>('REDIS_PASSWORD', ''),
      }),
      inject: [ConfigService], // Injects ConfigService
      isGlobal: true, // Makes cache globally available
    }),
    // MongooseModule.forFeature(modelDefs),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('DB_URI'),
    //     dbName: configService.get<string>('DB_NAME'),
    //   }),
    //   inject: [ConfigService],
    // }),
    DuneValidationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

