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
}