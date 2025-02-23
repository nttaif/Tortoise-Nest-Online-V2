import { IsString, IsEmail, IsNotEmpty, Min,Max, MinLength, MaxLength, IsOptional } from 'class-validator';
export class CreateUserDto {
    
    @MinLength(1)
    @IsString()
    @IsNotEmpty()
    firstName: string;
    
    @MinLength(1)
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    avatar?: string;

    @IsOptional()
    major?: {name: string, color: string}[];
    
    @IsOptional()
    @IsString()
    educationLevel?: string;

    @IsOptional()
    experienceYears?: number;

    @IsOptional()
    @IsString()
    publications?: string[];


    @IsOptional()
    @IsString()
    role?: string;
    
    @MinLength(1)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @IsNotEmpty()
    password: string;

    @IsOptional()
    codeId?: string;

    @IsOptional()
    codeExpired?: Date;
}
