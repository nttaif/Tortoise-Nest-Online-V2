import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private enrollmentModel: Model<EnrollmentDocument>,
  ) {}
  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    if (!Types.ObjectId.isValid(createEnrollmentDto.userId.toString())) {
            throw new BadRequestException('Invalid User Id');
    }
    if (!Types.ObjectId.isValid(createEnrollmentDto.courseId.toString())) {
      throw new BadRequestException('Invalid Courses Id');
    }
    const createdEnrollment = new this.enrollmentModel({
      ...createEnrollmentDto,
      enrollmentStatus: createEnrollmentDto.enrollmentStatus || 'pending',
    });
    return createdEnrollment.save();
  }

  async findAll():Promise<Enrollment[]>{
    return this.enrollmentModel.find()
      .populate('userId', '-password')
      .populate('courseId')
      .populate('transactionId')
      .exec();
  }

  async findOne(id: string) {
    const enrollment = await this.enrollmentModel.findById(id)
      .populate('userId', '-password')
      .populate('courseId')
      .populate('transactionId')
      .exec();
    if (!enrollment) {
      throw new NotFoundException(`Enrollment with id ${id} not found`);
    }
    return enrollment;
  }
  async findByUserId(userId: string): Promise<Enrollment[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid User Id');
    }
    return this.enrollmentModel.find({ userId })
      .populate('userId', '-password') // Populate userId nhưng loại bỏ trường password
      .populate('courseId')            // Populate toàn bộ thông tin của course
      .populate('transactionId')       // Populate toàn bộ thông tin của transaction
      .exec();
  }
  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment> {
    const updatedEnrollment = await this.enrollmentModel.findByIdAndUpdate(
      id,
      updateEnrollmentDto,
      { new: true },
    ).exec();
    if (!updatedEnrollment) {
      throw new NotFoundException(`Enrollment with id ${id} not found`);
    }
    return updatedEnrollment;
  }

  async remove(id: string) : Promise<Enrollment>{
    const deletedEnrollment = await this.enrollmentModel.findByIdAndDelete(id).exec();
    if (!deletedEnrollment) {
      throw new NotFoundException(`Enrollment with id ${id} not found`);
    }
    return deletedEnrollment;
  }
}
