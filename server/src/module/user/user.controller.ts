import { Controller, Get, Post, Body, Patch, Param, Delete,  HttpCode,
  HttpStatus,
  Query,
  BadRequestException,
  NotFoundException, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change.pasword.dto';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'The records been successfully created.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() query, @Query('current') current, @Query('pageSize') pageSize
  ) {
    return this.userService.findAll(query,+current,+pageSize);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Nếu cần, có thể kiểm tra tính hợp lệ của ObjectId tại đây
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Mongo ObjectId');
    }
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('change-password/:id')
  updatePassword(@Param('id') id: string, @Body() changePass:ChangePasswordDto) {
    return this.userService.updatePassword(id, changePass);
  }
  
  @Delete(':id')
  remove(@Param('id') userId:string) {
    return this.userService.remove(userId);
  }
}
