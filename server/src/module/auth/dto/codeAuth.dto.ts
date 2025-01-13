import { IsNotEmpty } from "class-validator";

export class CodeAuthDto{
    @IsNotEmpty()
    _id:string;
    @IsNotEmpty()
    verificationCode:string;
}