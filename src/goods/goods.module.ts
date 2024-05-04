import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Good } from './goods.model';
import { File } from 'src/file/file.model';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports:[
    SequelizeModule.forFeature([Good,File]),
    FileModule,
    AuthModule
  ]
})
export class GoodsModule {}
