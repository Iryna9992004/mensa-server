import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { Table } from "sequelize-typescript";
import { Good } from "src/goods/goods.model";

interface FileCreationAttrs{
    name:string;
    url:string;
    goodId:number;
}

@Table({tableName:'files'})
export class File extends Model<File,FileCreationAttrs>{
    @ApiProperty({example:'1',description:"Primary key"})
    @Column({type:DataType.INTEGER,primaryKey:true,autoIncrement:true,unique:true})
    id:number;

    @ApiProperty({example:'img.png',description:'Image name'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({example:'./img.png',description:'Image url'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    url: string;

    @ForeignKey(()=>Good)
    @Column({type:DataType.INTEGER})
    goodId:number;

    @BelongsTo(()=>Good)
    good:Good
}