import { Controller, Get, Post, Put, Delete, Param, Body, Query } from "@nestjs/common";
import { LessonsService } from "./lessons.service";

@Controller("lessons")
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: any) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get("course/:courseId")
  findAllByCourse(@Param("courseId") courseId: string) {
    return this.lessonsService.findAllByCourse(courseId);
  }
  @Get('schedules')
  async getSchedules(@Query('courseId') courseId?: string) {
    const schedules = await this.lessonsService.getLessonSchedules(courseId);
    return schedules;
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.lessonsService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateLessonDto: any) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.lessonsService.remove(id);
  }
  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Post(":id/contents")
  addContent(@Param("id") id: string, @Body() content: any) {
    console.log("Adding content to lesson:", id, content);
    return this.lessonsService.addLessonContent(id, content);
  }

  @Post(":id/contents/:contentId")
  updateContent(
    @Param("id") id: string,
    @Param("contentId") contentId: string,
    @Body() updatedContent: any
  ) {
    return this.lessonsService.updateLessonContent(id, contentId, updatedContent);
  }

  @Delete(":id/contents/:contentId")
  deleteContent(@Param("id") id: string, @Param("contentId") contentId: string) {
    return this.lessonsService.deleteLessonContent(id, contentId);
  }

  @Post(":id/schedules")
  addSchedule(@Param("id") id: string, @Body() schedule: any) {
    return this.lessonsService.addLessonSchedule(id, schedule);
  }

  @Post(":id/schedules/:scheduleId")
  updateSchedule(
    @Param("id") id: string,
    @Param("scheduleId") scheduleId: string,
    @Body() updatedSchedule: any
  ) {
    return this.lessonsService.updateLessonSchedule(id, scheduleId, updatedSchedule);
  }

  @Delete(":id/schedules/:scheduleId")
  deleteSchedule(@Param("id") id: string, @Param("scheduleId") scheduleId: string) {
    return this.lessonsService.deleteLessonSchedule(id, scheduleId);
  }
}