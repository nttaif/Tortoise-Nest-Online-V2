import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreateCourseDto {
    
        @MinLength(1)
        @IsString()
        @IsNotEmpty()
        name: string;
    
        @MinLength(1)
        @IsString()
        @IsNotEmpty()
        description: string;
    
        @MinLength(1)
        @IsString()
        @IsNotEmpty()
        image: string;  
    
        @IsNumber()
        @IsNotEmpty()
        price: number;
    
        @IsOptional()
        @IsNumber()
        discount?: number;
    
        @IsBoolean()
        status: boolean;
    
        @MinLength(1)
        @IsString()
        @IsNotEmpty()
        category: string;
    
        @IsString()
        teacherId: Types.ObjectId;
}
