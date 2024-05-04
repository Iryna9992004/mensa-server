import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { LoginUserDto } from 'src/users/dto/LoginUserDto';
import { AuthService } from './auth.service';
import { AdminDto } from 'src/users/dto/AdminDto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @ApiOperation({summary:'Registration'})
    @Post('/registration')
    registration(@Body() dto:CreateUserDto){
        return this.authService.registration(dto)
    }

    @ApiOperation({summary:'Login'})
    @Post('/login')
    login(@Body() dto:LoginUserDto){
        return this.authService.login(dto)
    }

    @ApiOperation({summary:'LoginAdmin'})
    @Post('/loginAdmin')
    loginAdmin(@Body() dto:AdminDto ){
        return this.authService.loginAdmin(dto)
    }
}
