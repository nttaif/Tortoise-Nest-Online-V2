import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "src/config/config.type";
import { generateSecretHash } from "./helper/util";

@Injectable()
export class AuthService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly userPoolId: string;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    
    }

  async signIn(username: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string | undefined;
    expiresIn: number | undefined;
    tokenType: string | undefined;
  }> {
    try {

      return {
        accessToken: 'response.AuthenticationResult.AccessToken',
        refreshToken: 'response.AuthenticationResult.RefreshToken',
        expiresIn: 1000,
        tokenType: 'response.AuthenticationResult.TokenType',
      };
    } catch (error) {
      throw new UnauthorizedException(`Login failed: ${error.message}`);
    }
  }
}
