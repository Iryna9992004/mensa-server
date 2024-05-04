import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/Order-dto';
import { CreateOrderDto } from 'src/orders/dto/create-order-dto';
import { OrdersService } from 'src/orders/orders.service';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Sequelize } from 'sequelize-typescript';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class OrderService {
    constructor(private ordersService:OrdersService,
        @InjectModel(Order) private orderRepository:typeof Order,
        private readonly sequelize:Sequelize,
        private jwtService:JwtService,
        private mailService:MailService){}


    async add(dto:OrderDto, arr:CreateOrderDto[],token){
        const transaction=await this.sequelize.transaction()
        try{
            const user=await this.jwtService.decode(token);
            const order=await this.orderRepository.create({name:dto.name,email:dto.email,surname:dto.surname,phoneNumber:dto.phoneNumber,userId:user.id},{transaction});

            await Promise.all(arr.map(async item => {
                await this.ordersService.add({...item,orderId:order.id},transaction);
            }));

            await transaction.commit();
            const id=order.id.toString();
            this.mailService.sendMailStatus(id,process.env.SENT_MAIL,'Оформлено')
            return order;
        }
        catch(e){
            console.log(e);
            await transaction.rollback();
        }
    }

    async getList(userId:number){
        try{
            const orders=await this.orderRepository.findAll({where:{userId}});
            const response=Promise.all(orders.map(async (item)=>{
                const or=await this.ordersService.list(item.id);
                return{
                    id:item.id,
                    name:item.name,
                    surname:item.surname,
                    phoneNumber:item.phoneNumber,
                    email:item.email,
                    createdAt:item.createdAt,
                    status:item.status,
                    list:or
                }
            }))
            return response
        }
        catch(e){
            console.log(e)
        }
    }

    async getAllOrders(){
        try{
            const orders=await this.orderRepository.findAll()
            const response=Promise.all(orders.map(async (item)=>{
            const or=await this.ordersService.list(item.id);
                return{
                    id:item.id,
                    name:item.name,
                    surname:item.surname,
                    phoneNumber:item.phoneNumber,
                    email:item.email,
                    createdAt:item.createdAt,
                    status:item.status,
                    list:or
                }
            }))
            return response
        }
        catch(e){
            console.log(e)
        }
    }

    async changeStatus(id:number,status:string){
        try{
            const order=await this.orderRepository.findOne({where:{id}});
            order.status=status;
            await order.save();
            this.mailService.sendMailStatus(order.name,order.email,status)
        }
        catch(e){
            console.log(e)
        }
    }
}
