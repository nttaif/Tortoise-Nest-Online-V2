import { IsString, IsEmail, IsNotEmpty, Min,Max, MinLength, MaxLength, IsOptional } from 'class-validator';
import { UserDocument } from '../schemas/user.schema';
export class CreateUserDto {
   
   
    @IsString()
    @IsNotEmpty()
    firstName: string;
    
    @IsString()
    @IsNotEmpty()
    lastName: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    password: string;

    @IsOptional()
    @MinLength(8)
    @MaxLength(50)
    rePassword: string;

    
}
