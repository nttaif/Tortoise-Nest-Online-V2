import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseConfigService } from './database/mongoose-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './database/config/database.config';
import appConfig from './config/app.config';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

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
    UserModule,
    MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService:ConfigService) => ({
      transport: {
        host: 'smtp.gmail.com',
        port: 465 ,
        secure:true,
        // ignoreTLS: true,
        // secure: false,
        auth: {          
          user: configService.get<string>('MAILDEV_USER'),
          pass: configService.get<string>('MAILDEV_PASS'),
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      // preview: true,
      template: {
        dir: process.cwd() + '/src/mail/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
  }),
  ],
})
export class AppModule {}
