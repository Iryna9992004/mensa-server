import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import {FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('goods')
export class GoodsController {
    constructor(private fileService: FileService,
        private goodsService:GoodsService) {}

    @UseInterceptors(JwtAuthGuard)
    @Post('/add')
    @UseInterceptors(FilesInterceptor('file',10))
    addGood(@UploadedFiles() files: Express.Multer.File[], @Body() dto:CreateGoodDto) {
        return this.goodsService.addGood(dto,files)
    }

    @Post('/delete/:id')
    deleteGood(@Param('id') id: number) {
    return this.goodsService.deleteGood(id);
    }

    @UseInterceptors(JwtAuthGuard)
    @Get('/get')
    getGoods(){
        return this.goodsService.goodList()
    }

    @Get('/getOne/:id')
    getOne(@Param('id') id:number){
        return this.goodsService.getGood(id)
    }
}