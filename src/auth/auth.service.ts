import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { LoginUserDto } from 'src/users/dto/LoginUserDto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { AdminDto } from 'src/users/dto/AdminDto';

@Injectable()
export class AuthService {

    constructor(private userService:UsersService,
        private jwtService:JwtService){}

    async login(userDto:LoginUserDto){
        const user=await this.validateUser(userDto);
        return this.generateToken(user)
    }

    async registration(userDto:CreateUserDto){
        const candidate=await this.userService.getUserByEmail(userDto.email);
        if(candidate){
            throw new HttpException('User with this email already exist',HttpStatus.BAD_REQUEST)
        }
        const hashPassword=await bcrypt.hash(userDto.password,4);
        const user=await this.userService.createUser({...userDto, password:hashPassword});
        return this.generateToken(user);
    }

    async generateToken(user:User){
        const payload={email:user.email,id:user.id}
        return {
            token:this.jwtService.sign(payload)
        }
    }

    async generateTokenAdmin(dto:AdminDto){
        const payload={login:dto.login};
        return{
            adminToken:this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto:LoginUserDto){
        const user=await this.userService.getUserByEmail(userDto.email);
        const passwordEquals=await bcrypt.compare(userDto.password,user.password);
        if(user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message:"Wrong email or password"})
    }

    async decodeToken(token:string){
        const decodedToken=this.jwtService.decode(token)
        return decodedToken
    }

    async loginAdmin(dto:AdminDto){
        const findAdmin=await this.userService.getAdminByLogin(dto.login)
        if(findAdmin){
            const passwordEquals=await bcrypt.compare(dto.password,findAdmin.password);
            if(passwordEquals){
                return this.generateTokenAdmin(dto);
            }
        }
    }
}
