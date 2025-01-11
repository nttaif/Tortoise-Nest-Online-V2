import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ConfirmForgotPasswordDto } from './dto/confirm-forgot-password.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
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
  async signIn(@Request() req) {
    const result = await this.authService.signIn(req.user);
    return result;
  }
  
  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created',
    schema: {
      properties: {
        message: { type: 'string' },
      },
    },
  })
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    const result = await this.authService.signUp(signUpDto);
    return result;
  }
}
