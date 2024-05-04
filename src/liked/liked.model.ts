import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface LikedCreationAttrs{
    name:string;
    description:string;
    price:number;
    url:string;
    userId:number;
}

@Table({tableName:'liked'})
export class Liked extends Model<Liked,LikedCreationAttrs>{
    @Column({type:DataType.INTEGER,primaryKey:true,autoIncrement:true,unique:true})
    id:number;

    @Column({type:DataType.STRING,unique:true,allowNull:false})
    name:string;

    @Column({type:DataType.STRING})
    description:string;

    @Column({type:DataType.TEXT,allowNull:false})
    url:string;

    @Column({type:DataType.INTEGER,allowNull:false})
    price:string;

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER,allowNull:false})
    userId:number;

    @BelongsTo(()=>User)
    user:User[];
}