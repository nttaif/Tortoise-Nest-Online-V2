import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: async (configService:ConfigService)=>({
        global:true,
        secret:configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:configService.get<string>('JWT_ACCESS_TOKEN_EXPRIED'),
        }
      }),
      inject:[ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
