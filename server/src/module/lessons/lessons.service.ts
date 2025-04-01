import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Lesson, LessonDocument } from "./schemas/lesson.schema";
import { CoursesService } from "../courses/courses.service";

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    private coursesService: CoursesService,
  ) {}

  async create(createLessonDto: any): Promise<Lesson> {
    const course = await this.coursesService.findOne(createLessonDto.courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    const createdLesson = new this.lessonModel(createLessonDto);
    return createdLesson.save();
  }

  async findAllByCourse(courseId: string): Promise<Lesson[]> {
    return this.lessonModel.find({ courseId }).exec();
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) {
      throw new NotFoundException("Lesson not found");
    }
    return lesson;
  }
  async addLessonContent(lessonId: string, content: any): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    lesson.contents.push(content);
    return lesson.save();
  }
  async update(id: string, updateLessonDto: any): Promise<Lesson> {
    const updatedLesson = await this.lessonModel
      .findByIdAndUpdate(id, updateLessonDto, { new: true })
      .exec();
    if (!updatedLesson) {
      throw new NotFoundException("Lesson not found");
    }
    return updatedLesson;
  }

  async remove(id: string): Promise<void> {
    const result = await this.lessonModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException("Lesson not found");
    }
  }
  
  async getLessonSchedules(courseId?: string): Promise<any[]> {
    const pipeline: any[] = [];
    console.log('Received courseId:', courseId);
    if (courseId) {
      if (typeof courseId !== 'string' || courseId.trim() === '') {
        throw new Error('Invalid courseId format');
      }
      pipeline.push({
        $match: { courseId: courseId },
      });
    }
    pipeline.push(
      { $unwind: '$scheduledTime' },
      {
        $lookup: {
          from: 'users',
          localField: 'scheduledTime.teacherId',
          foreignField: '_id',
          as: 'scheduledTime.teacher',
        },
      },
      { $unwind: '$scheduledTime.teacher' },
      {
        $project: {
          _id: '$scheduledTime._id',
          lessonId: {
            _id: '$_id',
            courseId: '$courseId',
            title: '$title',
            description: '$description',
            contents: '$contents',
            order: '$order',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
          teacherId: {
            _id: '$scheduledTime.teacher._id',
            firstName: '$scheduledTime.teacher.firstName',
            lastName: '$scheduledTime.teacher.lastName',
            email: '$scheduledTime.teacher.email',
          },
          startTime: '$scheduledTime.startTime',
          endTime: '$scheduledTime.endTime',
          meetingId: '$scheduledTime.meetingId',
          status: '$scheduledTime.status',
          createdAt: '$scheduledTime.createdAt',
          updatedAt: '$scheduledTime.updatedAt',
        },
      }
    );
    console.log('Aggregation pipeline:', JSON.stringify(pipeline, null, 2));
    const schedules = await this.lessonModel.aggregate(pipeline).exec();
    console.log('Schedules result:', schedules);
    return schedules;
  }
  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find().exec();
  }
  async updateLessonContent(lessonId: string, contentId: string, updatedContent: any): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    const contentIndex = lesson.contents.findIndex(c => c._id.toString() === contentId);
    if (contentIndex === -1) {
      throw new NotFoundException('Content not found');
    }
    lesson.contents[contentIndex] = { ...lesson.contents[contentIndex], ...updatedContent };
    return lesson.save();
  }
  async deleteLessonContent(lessonId: string, contentId: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    lesson.contents = lesson.contents.filter(c => c._id.toString() !== contentId);
    return lesson.save();
  }
  async addLessonSchedule(lessonId: string, schedule: any): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    lesson.scheduledTime.push(schedule);
    return lesson.save();
  }
  async updateLessonSchedule(lessonId: string, scheduleId: string, updatedSchedule: any): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    const scheduleIndex = lesson.scheduledTime.findIndex(s => s._id.toString() === scheduleId);
    if (scheduleIndex === -1) {
      throw new NotFoundException('Schedule not found');
    }
    lesson.scheduledTime[scheduleIndex] = { ...lesson.scheduledTime[scheduleIndex], ...updatedSchedule };
    return lesson.save();
  }
  async deleteLessonSchedule(lessonId: string, scheduleId: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    lesson.scheduledTime = lesson.scheduledTime.filter(s => s._id.toString() !== scheduleId);
    return lesson.save();
  }
}