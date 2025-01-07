import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CognitoAuthModule } from "@nestjs-cognito/auth";
import { PassportModule } from "@nestjs/passport";

import { AllConfigType } from "../config/config.type";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { CognitoAuthGuard } from "./guards/cognito-auth.guard";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        jwtVerifier: {
          userPoolId: configService.getOrThrow("cognito.userPoolId", {
            infer: true,
          }),
          clientId: configService.getOrThrow("cognito.clientId", {
            infer: true,
          }),
          tokenUse: configService.get("cognito.tokenUse", { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CognitoAuthGuard],
  exports: [AuthService, CognitoAuthGuard],
})
export class AuthModule {}
