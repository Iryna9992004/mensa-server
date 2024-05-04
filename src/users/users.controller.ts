import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { AdminDto } from './dto/AdminDto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService:UsersService, private jwtService:JwtService){}

    @ApiOperation({summary:'Create user'})
    @ApiResponse({status:200,type:User})
    @Post()
    create(@Body() dto:CreateUserDto){
        return this.userService.createUser(dto);
    }

    @Post('/createAdmin')
    createAdmin(@Body() dto:AdminDto){
        return this.userService.createAdmin(dto)
    }

    @Get('/get')
    getUser(@Req() req:Request){
        const token=req.headers['authorization'].split(' ')[1];
        const decodedToken=this.jwtService.decode(token)
        return this.userService.getUserById(decodedToken.id)
    }

    @Get('/getAll')
    getAllUsers(){
        return this.userService.getAllUsers()
    }
}
