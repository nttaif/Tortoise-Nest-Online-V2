
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types, UpdateWriteOpResult } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { NotFoundException, BadRequestException, Type } from '@nestjs/common';
import { validateID } from 'src/util/validate.id';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { checkPassword } from 'src/util/compare.password';
import { ChangePasswordDto } from './dto/change.pasword.dto';

export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  /**
   * Promise return User
   * find user by id
   */
  async findUserByID(_id: string) {
    return await this.userModel.findOne({_id});
  }
  /**
   * Promise return User
   * find user by email
   */
  async findUserByEmail(email:string){
    return await this.userModel.findOne({email});
  }

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
  async create(createUserDto: CreateUserDto): Promise<{ _id: Types.ObjectId }> {
    const emailExist = await this.checEmailExist(createUserDto.email);
    if (emailExist) {
      throw new BadRequestException('Email already exist');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hashSync(createUserDto.password, salt);
    const code = uuidv4().replace(/\D/g, '').slice(0, 8);
    try {
      const createUser = await this.userModel.create({
        firstName: createUserDto.firstName,
        password: hashedPassword,
        email: createUserDto.email,
        lastName: createUserDto.lastName,
        codeId: code,
        codeExpired: dayjs().add(5, 'minutes'),
      });
      return { _id: createUser._id };
    } catch (error) {
      throw new Error(error.message);
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
   * @param id 
   * @param updateUserDto 
   * Step 1 : Validate ObjectID
   * Step 2 : Update user follow id 
   * Step 3 : Return User
   * @returns updateUser
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    validateID(id);
    const updateUser = await this.userModel
      .updateOne({ _id: id }, updateUserDto, { new: true })
      .exec();
    return updateUser;
  }



  /**
   * 
   * @param id 
   * @param changePass 
   * Step 1 : Validate OjectID
   * Step 2 : Find ID of user, If not found return NotFoundException
   * Step 3 : Check password of user in the database with input current password
   * Step 4 : if dont match throw new BadRequestException
   * Step 5 : Check current password and new password, if both match throw BadRequestException
   * Step 6 : Continute check new password and reNewpassword, if the both are different throw BadRequestException
   * Step 7 : if all is true, hash the newPassowrd after update user with new password
   * @returns updateUser
   */
  async updatePassword(id: string, changePass: ChangePasswordDto): Promise<UpdateWriteOpResult> {
    validateID(id);
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    const isMatch = await checkPassword(changePass.currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password current is invalid');
    }
    if(changePass.currentPassword === changePass.newPassword){
      throw new BadRequestException("The new password must be different from the old password")
    }
    if (changePass.newPassword !== changePass.reNewpassword) {
      throw new BadRequestException('New password does not match');
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(changePass.newPassword, salt);
      const updateUser = await this.userModel.updateOne({ _id: id }, { password: hashedPassword }, { new: true }).exec();
      return updateUser;
    }
  }



/**
 * 
 * @param id
 * Promise return User 
 * Step 1 : Validate id is ObjectID
 * Step 2 : Find user by id in database
 * Step 3 : If not found user throw NotFoundException
 * @returns findandUpdate
 */
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
  checEmailExist = async (email: string): Promise<{ _id: Types.ObjectId } | null> =>
     await this.userModel.exists({ email: email });
}
