import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './file.model';

@Module({
  providers: [FileService],
  imports:[
    SequelizeModule.forFeature([File])
  ],
  exports:[FileService]
})
export class FileModule {}
