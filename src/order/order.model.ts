import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { OrderModel } from "src/orders/orders.model";
import { User } from "src/users/users.model";

interface OrderCreationAttrs{
    userId:number;
    name:string;
    surname:string;
    phoneNumber:string;
    email:string;
}

@Table({tableName:'order'})
export class Order extends Model<Order,OrderCreationAttrs>{
    @Column({type:DataType.INTEGER,primaryKey:true,autoIncrement:true,unique:true})
    id:number;

    @Column({type:DataType.STRING,defaultValue:'Оформлено'})
    status:string;

    @Column({type:DataType.STRING,allowNull:false})
    name:string;

    @Column({type:DataType.STRING,allowNull:false})
    surname:string;

    @Column({type:DataType.STRING,allowNull:false})
    phoneNumber:string;

    @Column({type:DataType.STRING,allowNull:false})
    email:string;

    @ApiProperty({example:12, description:'User id'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER,allowNull:false})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(()=>OrderModel)
    orderModel:OrderModel;
}