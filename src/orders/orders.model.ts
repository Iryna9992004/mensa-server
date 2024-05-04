import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Order } from "src/order/order.model";
import { User } from "src/users/users.model";

interface CreateOrderAttrs {
    imageUrl: string;
    name: string;
    price: number;
    goodQuantity: number;
    orderId:number
}

@Table({tableName:'orders'})
export class OrderModel extends Model<OrderModel, CreateOrderAttrs> {
    @ApiProperty({example:1, description:'Primary key'})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;

    @ApiProperty({example:'img.png', description:'Image url'})
    @Column({type: DataType.TEXT, allowNull: false})
    imageUrl: string;

    @ApiProperty({example:'Red candle', description:'Name of order'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example:400, description:'Price of order'})
    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @ApiProperty({example:4, description:'Good quantity'})
    @Column({type: DataType.INTEGER, allowNull: false})
    goodQuantity: number;

    @ForeignKey(()=>User)
   @Column({type:DataType.INTEGER,allowNull:true})
   userId:number;

   @BelongsTo(()=>User)
   user:User;

   @ForeignKey(()=>Order)
   @Column({type:DataType.INTEGER,allowNull:false})
   orderId:number;

   @BelongsTo(()=>User)
   order:User;
}