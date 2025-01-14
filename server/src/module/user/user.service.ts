
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { validateID } from 'src/util/validate.id';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { checkPassword } from 'src/util/compare.password';
import { ChangePasswordDto } from './dto/change.pasword.dto';
import { ResponseUser } from './dto/responses.user.dto';
import { plainToInstance } from 'class-transformer';

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

  /** Create new user
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
    
    try {
      const createUser = await this.userModel.create({
        firstName: createUserDto.firstName,
        password: hashedPassword,
        email: createUserDto.email,
        lastName: createUserDto.lastName,
        address:createUserDto.address,
        codeId:  uuidv4().replace(/\D/g, '').slice(0, 8),
        codeExpired: dayjs().add(5, 'minutes'),
      });
      return { _id: createUser._id };
    } catch (error) {
      throw new Error(error.message);
    }
  }



 /**
  * Find all users with pagination.
  * 
  * @param page - The page number to retrieve.
  * @param limitPage - The number of users per page.
  * Promise User[] or undefined total and totalPage
  * Step 1: validate page<=0 and limitPage<=0
  * Step 2: skip Calculate the number of documents to skip based on the current number of pages and the number of documents per page.
  * Step 3: Find all User with Pagination 
  * Step 4: select necessary filed 
  * Step 5: countDocuments is count total user 
  * Step 6: Math ceil totalPage
  * Step 7: return users and total and totalPage
  * @returns User[] , total , totalPage
  */
 async findAll(page: number, limitPage: number): Promise<{ users: ResponseUser[]|undefined; total: number ; totalPage:number}> {
        if(page<=0||limitPage<=0){
          page=1
          limitPage=1
        }
   const skip = (page-1) * limitPage;
   const [users, total] = await Promise.all([
     this.userModel.find().skip(skip).limit(limitPage).exec(),
     this.userModel.countDocuments().exec()
   ]);
   const userDto = plainToInstance(ResponseUser, users, {excludeExtraneousValues:false});
   let totalPage : number;
   totalPage = Math.ceil(total/limitPage) ;
   return {
     users:userDto,
     total,
     totalPage
   };
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
   * Step 3 : Return message
   * @returns message
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<{message}> {
       validateID(id);
       await this.userModel
      .updateOne({ _id: id }, updateUserDto, { new: true })
      .exec();
    return { message: `User updated successfully` };
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
  async updatePassword(id: string, changePass: ChangePasswordDto): Promise<{message}> {
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
      const salt           = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(changePass.newPassword, salt);
                             await this.userModel.updateOne({ _id: id }, { password: hashedPassword }, { new: true }).exec();
      return {message:`Password updated successfully`};
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
