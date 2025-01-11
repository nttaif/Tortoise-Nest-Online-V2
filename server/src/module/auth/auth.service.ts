import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { checkPassword } from 'src/util/compare.password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly userService: UserService,
    private readonly jwtService:JwtService,
  ) {}

  /**
   * @param username
   * @param password
   * if username or password is empty throw UnauthorizedException
   * if username and password valid call signIn method from user service
   */
  async signIn(user: User): Promise<{
    user: {
      email: string,
      _id: string,
      firstName: string,
      lastName: string,
    };
    access_token: string;
  }> {
    try {
      const payload = { email: user.email, sub: user._id.toString() };
      return {
        user: {
          email: user.email,
          _id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
        },
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new UnauthorizedException(`Login failed: ${error.message}`);
    }
  }
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!user) return null;
    const isCompar = await checkPassword(pass, user.password);
    if (!isCompar) return null;
    return user;
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
  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    try {
      if (signUpDto.password !== signUpDto.rePassword) {
        throw new UnauthorizedException(
          `Password and Confirm Password not match`,
        );
      }
      const createUserDto: CreateUserDto = {
        email: signUpDto.email,
        password: signUpDto.password,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
      };
      const result = await this.userService.create(createUserDto);
      return { message: `Create account successfully with id:  ${result._id}` };
    } catch (error) {
      throw new UnauthorizedException(`Register failed: ${error.message}`);
    }
  }

  
}
