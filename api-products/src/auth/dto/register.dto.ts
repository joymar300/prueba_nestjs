import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString, isString, MinLength } from "class-validator";

export class RegisterDto{
    @IsString()
    @Transform(({value})=> value.trim())
    fname: string;
    
    @IsString()
    @IsOptional()
    sname?: string;
    
    @IsString()
    @IsOptional()
    flastname?: string;
    
    @IsString()
    @IsOptional()
    slastname?: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Transform(({value})=> value.trim())
    password: string;
}