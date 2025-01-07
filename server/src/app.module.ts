import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './database/mongoose-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './database/config/database.config';
import appConfig from './config/app.config';
import { AuthModule } from './module/auth/auth.module';

const infrastructureDatabaseModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        appConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
