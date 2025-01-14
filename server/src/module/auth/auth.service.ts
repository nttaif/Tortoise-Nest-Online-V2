import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { checkPassword } from 'src/util/compare.password';
import { JwtService } from '@nestjs/jwt';
import { ResponseUser } from '../user/dto/responses.user.dto';
import { CodeAuthDto } from './dto/codeAuth.dto';
import dayjs from 'dayjs';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @param username
   * @param password
   * if username or password is empty throw UnauthorizedException
   * if username and password valid call signIn method from user service
   */
  async signIn(user: User): Promise<{
    access_token: string;
  }> {
    try {
      const payload = { email: user.email, sub: user._id.toString() };
      return {
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
        address: signUpDto.address
      };
      const result = await this.userService.create(createUserDto);
      return { message: `Create account successfully with id:  ${result._id}` };
    } catch (error) {
      throw new UnauthorizedException(`Register failed: ${error.message}`);
    }
  }
  /**
   * @param userInfo: email, _id
   * if user not found throw UnauthorizedException
   * @returns responseUser
   */
  async getCurrentUser(userInfo: {
    _id: string;
    email: string;
  }): Promise<ResponseUser | undefined> {
    try {
      const user = await this.userService.findUserByID(userInfo._id);
      const responseUser = new ResponseUser();
      if (user !== null) {
        return {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isActive: user.isActive,
          createdAt: (user as any).createdAt,
          updatedAt: (user as any).updatedAt,
          __v: user.__v,
        } as ResponseUser;
      }
    } catch (error) {
      throw new UnauthorizedException(
        `Get current user failed: ${error.message}`,
      );
    }
  }

  /**
   *
   * @param verifyInfo
   * call method findUserByEmail from user service
   * if user not found throw BadRequestException
   * check expired of code
   * @returns checkIsBefore: boolean
   */
  async handleActivityAccount(
    verifyInfo: CodeAuthDto,
  ): Promise<{ message: string }> {
    const user = await this.userService.findUserByID(verifyInfo._id);
    if (!user) {
      throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
    }
    //check expired
    const checkIsBefore = dayjs().isBefore(user.codeExpired);
    if (checkIsBefore) {
      if (user.codeId === verifyInfo.verificationCode) {
        const updateUserDto = new UpdateUserDto();
        updateUserDto.isActive = true;
        await this.userService.update(verifyInfo._id, updateUserDto);
      }else{
        throw new BadRequestException('Mã code của bạn không đúng');
      }
    } else {
      throw new BadRequestException('Mã code của bạn đã hết hạn');
    }
    return { message:"Verification Successfully" };
  }

  async refreshToken(
    refreshToken: string,
    username: string,
  ): Promise<{ access_token: string }> {
    try {
      return { access_token: 'new access token' };
    } catch (error) {
      throw new UnauthorizedException(`Refresh token failed: ${error.message}`);
    }
  }
}
