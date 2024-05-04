import { Body, Controller, Get, Post, Req} from '@nestjs/common';
import { OrderDto } from './dto/Order-dto';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';
import { StatusDto } from './dto/StatusDto';

@Controller('order')
export class OrderController {
    constructor(private orderService:OrderService,
        private jwtService:JwtService){}

    @Post('/add')
    add(@Body() dto:OrderDto,@Req() req:Request){
        const token=req.headers['authorization'].split(' ')[1];
        return this.orderService.add(dto,dto.list,token);
    }

    @Get('/get')
    getOrder(@Req() req:Request){
        const token=req.headers['authorization'].split(' ')[1];
        const decodedToken=this.jwtService.decode(token)
        return this.orderService.getList(decodedToken.id)
    }

    @Get('/getAllOrders')
    getAllOrders(){
        return this.orderService.getAllOrders()
    }

    @Post('/changeStatus')
    changeStatus(@Body() dto:StatusDto){
        return this.orderService.changeStatus( dto.id,dto.status)
    }
}
