import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType } from "sequelize-typescript";

interface AdminAttrs{
    login:string;
    password:string
}

@Table({tableName:'admins'})
export class Admin extends Model<Admin,AdminAttrs>{

    @Column({type:DataType.INTEGER,autoIncrement:true,primaryKey:true,unique:true})
    id:number;

    @ApiProperty({example:"adminAdn",description:'Login'})
    @Column({type:DataType.STRING,allowNull:false,unique:true})
    login:string;

    @ApiProperty({example:"hmKLhohui",description:'Password'})
    @Column({type:DataType.STRING,allowNull:false})
    password:string;
}