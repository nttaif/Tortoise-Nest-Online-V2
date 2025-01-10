import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { generateSecretHash } from './helper/util';
import { User } from '../user/schemas/user.schema';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly userPoolId: string;

  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly userService: UserService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{
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


  /**
   * Sign up user
   * @param signUpDto
   * if password and rePassword not match throw UnauthorizedException
   * create createUserDto object from signUpDto
   * call createUser method from user service
   * if createUser method throw error throw UnauthorizedException
   * @returns
   */
  async signUp(signUpDto:SignUpDto): Promise<{ message: string }> {
    try {
      if(signUpDto.password !== signUpDto.rePassword){
        throw new UnauthorizedException(`Password and Confirm Password not match`);
      }
      const createUserDto: CreateUserDto = {
        email: signUpDto.email,
        password: signUpDto.password,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
      };
      const result = await this.userService.create(createUserDto);
      return { message:`Create account successfully with id:  ${result._id}`};
    } catch (error) {
      throw new UnauthorizedException(`Register failed: ${error.message}`);
    }
  }
}
