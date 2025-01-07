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
}
