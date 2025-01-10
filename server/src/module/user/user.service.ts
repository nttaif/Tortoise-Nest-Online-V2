
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SchemaType, Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { NotFoundException, BadRequestException, Type } from '@nestjs/common';
import { checkPassword } from 'src/util/compare.password';
import { validateID } from 'src/util/validate.id';


export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }



  /**
   * 
   * @param createUserDto 
   * Promise return User 
   * Step1: Generate salt
   * Step2: Use bcrypt hash the password 
   * Step3: Create a new user with the hashed password
   * Step4: Save the user
   * Step5: If error throw the error
   * @returns createUser
   */
  async create(createUserDto: CreateUserDto): Promise<{_id:Types.ObjectId}> {

    const emailExist = await this.checEmailExist(createUserDto.email);
    if (emailExist) {
      throw new BadRequestException('Email already exist');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hashSync(createUserDto.password, salt);
    try {
      const createUser = await this.userModel.create({
        firstName: createUserDto.firstName,
        password: hashedPassword,
        email: createUserDto.email,
        lastName: createUserDto.lastName,
      });
      return {_id: createUser._id};
    } catch (error) {
      throw new Error(error);
    }
  }



  ////////////
  findAll(): Promise<User[]> {
    const users = this.userModel.find().exec();
    return users;
  }




  ////////////
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


  /**
   * Promise return User
   * Step1: Validate the id
   * Step2: Find user by id and update the user
   * Step3: if user not found throw NotFoundException
   * Step4: If user found return the updated user
  */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {

    validateID(id);
    const updateUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updateUser) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return updateUser;
  }



  async remove(id: string): Promise<User> {
    validateID(id);
    const findandUpdate = await this.userModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
    if (!findandUpdate) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return findandUpdate;
  }

  /** 
   * Promise return ObjectID of the user
   * Check email exist in the database
   * @returns ObjectID
  */
  checEmailExist = async(email:string):Promise<{_id:Types.ObjectId}|null> => await this.userModel.exists({ email: email });

}
