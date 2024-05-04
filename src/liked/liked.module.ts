import { Module } from '@nestjs/common';
import { LikedController } from './liked.controller';
import { LikedService } from './liked.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Liked } from './liked.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LikedController],
  providers: [LikedService],
  imports:[
    SequelizeModule.forFeature([User,Liked]),
    AuthModule
  ]
})
export class LikedModule {}
