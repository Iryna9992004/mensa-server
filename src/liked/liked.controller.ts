import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LikedDto } from './dto/LikedDto';
import { LikedService } from './liked.service';

@Controller('liked')
export class LikedController {
    constructor(private likedService:LikedService){}

    @Post('/add')
    add(@Body() dto:LikedDto, @Req() req:Request){
        const auth=req.headers;
        const token=auth['authorization'].split(' ')[1]
        return this.likedService.add(dto,token)
    }

    @Post('/delete/:id')
    delete(@Param('id') id:number ){
        return this.likedService.delete(id);
    }

    @Get('/list')
    list(@Req() req:Request){
        const auth=req.headers;
        const token=auth['authorization'].split(' ')[1];
        return this.likedService.list(token)
    }
}
