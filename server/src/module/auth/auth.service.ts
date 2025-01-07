import { Injectable, UnauthorizedException } from "@nestjs/common";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "../config/config.type";
import { generateSecretHash } from "./helper/util";

@Injectable()
export class AuthService {
  private readonly cognitoClient: CognitoIdentityProviderClient;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly userPoolId: string;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.clientId = this.configService.getOrThrow("cognito.clientId", {
      infer: true,
    });
    this.clientSecret = this.configService.getOrThrow("cognito.clientSecret", {
      infer: true,
    });
    this.userPoolId = this.configService.getOrThrow("cognito.userPoolId", {
      infer: true,
    });
    
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.getOrThrow("cognito.region", { infer: true }),
    });
  }

  async signIn(username: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string | undefined;
    expiresIn: number | undefined;
    tokenType: string | undefined;
  }> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: generateSecretHash(username, this.clientId, this.clientSecret),
        },
      });

      const response = await this.cognitoClient.send(command);
      
      if (!response.AuthenticationResult?.AccessToken) {
        throw new UnauthorizedException("Login failed: No access token returned");
      }

      return {
        accessToken: response.AuthenticationResult.AccessToken,
        refreshToken: response.AuthenticationResult.RefreshToken,
        expiresIn: response.AuthenticationResult.ExpiresIn,
        tokenType: response.AuthenticationResult.TokenType,
      };
    } catch (error) {
      throw new UnauthorizedException(`Login failed: ${error.message}`);
    }
  }

  async forgotPassword(username: string): Promise<void> {
    try {
      const command = new ForgotPasswordCommand({
        ClientId: this.clientId,
        Username: username,
        SecretHash: generateSecretHash(username, this.clientId, this.clientSecret),
      });

      await this.cognitoClient.send(command);
    } catch (error) {
      throw new UnauthorizedException(`Password reset request failed: ${error.message}`);
    }
  }

  async confirmForgotPassword(
    username: string, 
    confirmationCode: string, 
    newPassword: string
  ): Promise<void> {
    try {
      const command = new ConfirmForgotPasswordCommand({
        ClientId: this.clientId,
        Username: username,
        ConfirmationCode: confirmationCode,
        Password: newPassword,
        SecretHash: generateSecretHash(username, this.clientId, this.clientSecret),
      });

      await this.cognitoClient.send(command);
    } catch (error) {
      throw new UnauthorizedException(`Password reset confirmation failed: ${error.message}`);
    }
  }

  /**
   * Refreshes the access token using a valid refresh token
   * @param refreshToken - The refresh token from the previous authentication
   * @returns New authentication tokens
   * @throws UnauthorizedException if the refresh token is invalid or expired
   */
  async refreshToken(refreshToken: string, username: string): Promise<{
    accessToken: string;
    refreshToken: string | undefined;
    expiresIn: number | undefined;
    tokenType: string | undefined;
  }> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
        ClientId: this.clientId,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
          SECRET_HASH: generateSecretHash(username, this.clientId, this.clientSecret),
        },
      });

      const response = await this.cognitoClient.send(command);

      if (!response.AuthenticationResult?.AccessToken) {
        throw new UnauthorizedException("Token refresh failed: No access token returned");
      }

      return {
        accessToken: response.AuthenticationResult.AccessToken,
        refreshToken: response.AuthenticationResult.RefreshToken ?? refreshToken,
        expiresIn: response.AuthenticationResult.ExpiresIn,
        tokenType: response.AuthenticationResult.TokenType,
      };
    } catch (error) {
      throw new UnauthorizedException(`Token refresh failed: ${error.message}`);
    }
  }
}
