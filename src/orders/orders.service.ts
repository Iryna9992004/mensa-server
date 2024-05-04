import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './orders.model';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(OrderModel) private orderRepository:typeof OrderModel){}

    async add(dto:CreateOrderDto, transaction:any ){
        try{
            const order=await this.orderRepository.create({...dto},{transaction});
            return order;
        }
        catch(e){
            console.log(e)
        }
    }

    async delete(id:string){
        try{
            const order=await this.orderRepository.destroy({where:{id}});
            return order;
        }
        catch(e){
            console.log(e)
        }
    }

    async list(orderId:number){
        try{
            const orders=await this.orderRepository.findAll({where:{orderId}});
            return orders;
        }
        catch(e){
            console.log(e)
        }
    }

    
}
