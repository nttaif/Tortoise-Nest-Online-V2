import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.shcema';
import { Model, Types } from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class CoursesService {
    constructor(
      @InjectModel(Course.name) private coursesModel: Model<Course>,
      private readonly userService: UserService,
    ) {}
  
  async create(createCourseDto: CreateCourseDto):Promise<{
    createCourseDto : CreateCourseDto
  }> {
      if (!Types.ObjectId.isValid(createCourseDto.teacherId.toString())) {
        throw new BadRequestException('Invalid Teacher Id');
      }
      const checkTeacher = await this.userService.findUserByID(createCourseDto.teacherId.toString())
      if(!checkTeacher || checkTeacher.role!=="Teacher"){
        throw new BadRequestException('Teacher is not found')
      }
      const createCourses = await this.coursesModel.create({
        ...createCourseDto,
        teacherId: new Types.ObjectId(createCourseDto.teacherId)
      });
      return {
        createCourseDto
      };
  }

  async findAll() {
    return await this.coursesModel.find().populate({
      path: 'teacherId',     // Populate trường teacherId (tham chiếu đến User)
      select: '-password -__v'  // Loại bỏ các trường không cần thiết, ví dụ password, __v
    });
  }

  async findOne(id: string) {
    // Kiểm tra tính hợp lệ của courseId
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException('Invalid Course Id');
  }
  // Query và populate trường teacherId
  const course = await this.coursesModel.findById({_id:id})
    .populate({
      path: 'teacherId',  // Trường tham chiếu chứa thông tin teacher
      select: '-password -__v', // Loại bỏ những trường không cần thiết, ví dụ password
    })
    .exec();
  return course;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
