import { Handler } from 'src/Handler/Handler';
import { IUserRepository } from '../reposittory/IUserRepository';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

export class EmailExistsHandler extends Handler {
  constructor(private userRepository: IUserRepository) {
    super();
  }

  async handle(request: any): Promise<any> {
    const emailExist = await this.userRepository.exists(request.email);
    if (emailExist) {
      throw new BadRequestException('Email already exist');
    }
    return super.handle(request);
  }
}

export class PasswordHashHandler extends Handler {
  async handle(request: any): Promise<any> {
    const salt = await bcrypt.genSalt();
    request.password = await bcrypt.hash(request.password, salt);
    return super.handle(request);
  }
}

