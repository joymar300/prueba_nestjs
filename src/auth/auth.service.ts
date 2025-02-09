import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService

    ){}
    
    async register({fname, email,password, sname,flastname,slastname} : RegisterDto){
        const user= await this.userService.findOneByEmail(email)
        if (user) {
            throw new BadRequestException('usuario ya existe')
            
        }
        return await this.userService.create({ 
            fname,
            email, 
            password : await bcryptjs.hash(password,10), 
            sname: sname || '',
            flastname: flastname || '',
            slastname: slastname|| ''
        });
    }
   async login({email, password}:LoginDto){

        const user = await this.userService.findOneByEmail(email)
        if(!user){
            throw new UnauthorizedException('invalid Email ')
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid password')
        }
        const payload = {email: user.email};
        const token = await this.jwtService.signAsync(payload)
        return{ token, email}
    }
}
