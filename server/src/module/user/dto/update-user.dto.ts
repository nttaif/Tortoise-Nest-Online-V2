import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty ,IsOptional} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
     @IsOptional()
     @IsString()
     firstName?: string;

     @IsOptional()
     @IsString()
     lastName?: string;

     @IsOptional()
     @IsString()
     educationLevel?: string;
 
     @IsOptional()
     experienceYears?: number;
     
     @IsOptional()
     major?: {name: string, color: string}[];

     @IsOptional()
     @IsString()
     publications?: string[];

     @IsOptional()
     isActive?: boolean;

     @IsOptional()
     isClose?: boolean;

     @IsOptional()
     @IsString()
     role?: string;

}
