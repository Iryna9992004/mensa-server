import { CreateOrderDto } from "src/orders/dto/create-order-dto";

export class OrderDto{
    userId:number;
    name:string;
    surname:string;
    phoneNumber:string;
    email:string;

    list:CreateOrderDto[]
}