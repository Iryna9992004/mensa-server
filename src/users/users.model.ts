import { ApiProperty } from "@nestjs/swagger";
import { HasMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Liked } from "src/liked/liked.model";
import { Order } from "src/order/order.model";
import { OrderModel } from "src/orders/orders.model";

interface UserCreationAttrs{
    surname:string;
    name:string;
    phoneNumber:string;
    email:string;
    password:string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example:'1',description:"Primary key"})
    @Column({type:DataType.INTEGER,primaryKey:true,autoIncrement:true,unique:true})
    id:number;

    @ApiProperty({example:'Ivan',description:"Name"})
    @Column({type:DataType.STRING,allowNull:false})
    surname:string;

    @ApiProperty({example:'Sumonenko',description:"Surname"})
    @Column({type:DataType.STRING,allowNull:false})
    name:string;

    @ApiProperty({example:'+(380)-670-89-23',description:"Phone number"})
    @Column({type:DataType.STRING,allowNull:false})
    phoneNumber:string;

    @ApiProperty({example:'ap@gmail.com',description:"Gmail"})
    @Column({type:DataType.STRING,allowNull:false,unique:true})
    email:string;

    @ApiProperty({example:'1788hjbgv',description:"Password"})
    @Column({type:DataType.STRING,allowNull:false})
    password:string;

    @HasMany(()=>Order)
    orders:Order[]

    @HasMany(()=>Liked)
    liked:Liked[]
}