import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ConfirmForgotPasswordDto } from './dto/confirm-forgot-password.dto';
import { CognitoAuthGuard } from './guards/cognito-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully authenticated',
    schema: {
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  })
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    const result = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return result;
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Initiate password reset' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset initiated',
  })
  @UseGuards(CognitoAuthGuard)
  async forgotPassword(
    @Body(ValidationPipe) forgotPasswordDto: ForgotPasswordDto,
  ) {
    await this.authService.forgotPassword(forgotPasswordDto.username);
    return { message: 'Password reset code sent to email' };
  }

  @Post('confirm-forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Complete password reset' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password successfully reset',
  })
  async confirmForgotPassword(
    @Body(ValidationPipe) confirmForgotPasswordDto: ConfirmForgotPasswordDto,
  ) {
    await this.authService.confirmForgotPassword(
      confirmForgotPasswordDto.username,
      confirmForgotPasswordDto.code,
      confirmForgotPasswordDto.newPassword,
    );
    return { message: 'Password reset successful' };
  }

  @Get('me')
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Current user profile',
  })
  getCurrentUser(@CurrentUser() user: any) {
    return user;
  }

  /**
   * Refreshes the access token using a valid refresh token
   * @param refreshTokenDto - DTO containing the refresh token
   * @returns New authentication tokens
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(
      refreshTokenDto.refreshToken,
      refreshTokenDto.username,
    );
  }
}
