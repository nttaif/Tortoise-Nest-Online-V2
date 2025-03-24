import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { validateID } from 'src/util/validate.id';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { ChangePasswordDto } from './dto/change.pasword.dto';
import aqp from 'api-query-params';
import { IUserRepository } from './reposittory/IUserRepository';
import { Types } from 'mongoose';
import { EmailExistsHandler, PasswordHashHandler } from './handler/user.handlers';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo:IUserRepository,
  ) {}

  /**
   * Promise return User
   * find user by id
   */
  async findUserByID(_id: string): Promise<User | null> {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Invalid Mongo ObjectId');
    }
    return this.userRepo.findById(_id);
  }
  /**
   * Promise return User
   * find user by email
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
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
  async create(
    createUserDto: CreateUserDto,
  ): Promise<{
    _id: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    code_id: string;
  }> {
    const emailHandler = new EmailExistsHandler(this.userRepo);
    const passwordHandler = new PasswordHashHandler();
    emailHandler.setNext(passwordHandler);
    const request = { ...createUserDto };
    try {
      await emailHandler.handle(request);
    } catch (error) {
      throw error;
    }
    const isTeacher =
    createUserDto.major ||
    !!createUserDto.educationLevel ||
    createUserDto.experienceYears !== undefined;
    try {
      const createUser = await this.userRepo.create({
        firstName: request.firstName,
      password: request.password,
      email: request.email,
      lastName: request.lastName,
      role: isTeacher ? 'Teacher' : 'Student',
      address: request.address || 'No information yet',
      codeId: uuidv4().replace(/\D/g, '').slice(0, 8),
      codeExpired: dayjs().add(5, 'minutes').toDate(),
      ...(isTeacher && {
        major: request.major,
        educationLevel: request.educationLevel,
        experienceYears: request.experienceYears,
        publications: request.publications,
        }),
      });
      return {
        _id: createUser._id,
        email: createUser.email,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        code_id: createUser.codeId,
      };
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
   * Step 3: Find all User with Pagination and select filed core
   * Step 4: countDocuments is total user
   * Step 5: Math ceil totalPage
   * Step 6: return users and total and totalPage
   * @returns User[] , total , totalPage
   */
  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    //bỏ các tham số không cần thiết
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    //Gán giá trị mặc định nếu current hoặc pageSize không được truyền
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;
    //Đếm tổng số lượng bản ghi
    const totalItems = await this.userRepo.countDocuments(filter);
    //Tính toán tổng số trang
    const totalPage = Math.ceil(totalItems / pageSize);
    // Tính số bản ghi cần bỏ qua
    const skip = (current - 1) * pageSize;
    //Lấy các kết quả theo trang và sắp xếp
    const results = await this.userRepo.findAll(filter, skip, pageSize, sort);
    return { 
      meta:{
        current:current,
        pageSize:pageSize,
        pages:totalPage,
        total:totalItems,
      },
      results
      };
  }

  ////////////
  async findOne(_id: string): Promise<User | null> {
    return this.userRepo.findById(_id);
  }

  /**
   * @param id
   * @param updateUserDto
   * Step 1 : Validate ObjectID
   * Step 2 : Update user follow id
   * Step 3 : Return User
   * @returns updateUser
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    validateID(id);
    return this.userRepo.update(id, updateUserDto);
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
  async updatePassword(id: string, changePass: ChangePasswordDto): Promise<User | null> {
    validateID(id);
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    const isMatch = await bcrypt.compare(changePass.currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password current is invalid');
    }
    if (changePass.currentPassword === changePass.newPassword) {
      throw new BadRequestException('The new password must be different from the old password');
    }
    if (changePass.newPassword !== changePass.reNewpassword) {
      throw new BadRequestException('New password does not match');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(changePass.newPassword, salt);
    return this.userRepo.update(id, { password: hashedPassword });
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
  async remove(id: string): Promise<User | null> {
    validateID(id);
    const updatedUser = await this.userRepo.findByIdAndUpdate(id, { isActive: false });
    if (!updatedUser) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return updatedUser;
  }

  /**
   * Promise return ObjectID of the user
   * Check email exist in the database
   * @returns ObjectID
   */
}
