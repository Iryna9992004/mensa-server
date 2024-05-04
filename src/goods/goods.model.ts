import { ApiProperty } from "@nestjs/swagger";
import { HasMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { File } from "src/file/file.model";

export interface GoodCreationAttrs{
    name:string;
    description:string;
    price:number;
}

@Table({tableName:'goods'})
export class Good extends Model<Good,GoodCreationAttrs>{
    @ApiProperty({example:1,description:"Primary key"})
    @Column({type:DataType.INTEGER,primaryKey:true,autoIncrement:true,unique:true})
    id:number;

    @ApiProperty({example:'Red velvet',description:'Name'})
    @Column({type:DataType.STRING,unique:true,allowNull:false})
    name:string;

    @ApiProperty({example:'Good quality, natural ingredients',description:'Description'})
    @Column({type:DataType.STRING,allowNull:false})
    description:string;

    @ApiProperty({example:200,description:'Price'})
    @Column({type:DataType.INTEGER,allowNull:false})
    price:number;

    @HasMany(()=>File)
    imageUrl:File[];
}