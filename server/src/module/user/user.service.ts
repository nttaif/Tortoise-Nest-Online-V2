
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';


export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

 async create(createUserDto: CreateUserDto):Promise<User> {
   const salt = await bcrypt.genSalt();
   const createUser = new this.userModel({
     firstName: createUserDto.firstName,
     password: bcrypt.hashSync(createUserDto.password, salt),
     email: createUserDto.email,
      lastName: createUserDto.lastName,
   });
    return this.userModel.create(createUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
