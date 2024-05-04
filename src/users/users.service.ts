import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/CreateUserDto';
import { AdminDto } from './dto/AdminDto';
import { Admin } from './admin.model';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepisitory:typeof User,
    @InjectModel(Admin) private adminRepository:typeof Admin){}

    async createUser(dto:CreateUserDto){
        const user=await this.userRepisitory.create(dto);
        return user;
    }

    async createAdmin(dto:AdminDto){
        const hashPassword=await bcrypt.hash(dto.password,4)
        const admin=await this.adminRepository.create({...dto,password:hashPassword});
        return admin;
    }

    async getUserByEmail(email:string){
        const user=await this.userRepisitory.findOne({where:{email}})
        return user;
    }

    async getAdminByLogin(login:string){
        const admin=await this.adminRepository.findOne({where:{login}});
        return admin;
    }

    async getUserById(id:number){
        const user=await this.userRepisitory.findOne({where:{id}})
        return user;
    }

    async getAllUsers(){
        const users=await this.userRepisitory.findAll()
        return users
    }
}
