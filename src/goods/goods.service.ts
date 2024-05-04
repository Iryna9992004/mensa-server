import { Injectable, UploadedFiles } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService } from 'src/file/file.service';
import { Good } from './goods.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateGoodDto } from './dto/create-good-dto';
import { File } from 'src/file/file.model';

@Injectable()
export class GoodsService {
    constructor(@InjectModel(Good) private goodRepository:typeof Good,
    private readonly sequelize:Sequelize,
    private readonly fileService:FileService,
    @InjectModel(File) private readonly fileRepository:typeof File){}

    async addGood(dto: CreateGoodDto, @UploadedFiles() files: Express.Multer.File[]) {
        const transaction = await this.sequelize.transaction();
        try {
            const good = await this.goodRepository.create(dto, { transaction });
            const goodId = good.id;
            await this.fileService.uploadFile(files, goodId, transaction);
            await transaction.commit();
            return good;
        } catch (e) {
            await transaction.rollback();
            console.log(e);
        }
    }

     async deleteGood(id:number){
        try{
            const good=await this.goodRepository.findOne({where:{id}});
            const files=await this.fileRepository.findAll({where:{goodId:good.id}});

            for(const file of files){
                await this.fileService.deleteFile(file.name)
            }

            return await this.goodRepository.destroy({where:{id}})
        }
        catch(e){
            console.log(e)
        }
     }

     async goodList() {
        try {
            const goodsA = await this.goodRepository.findAll();
            const goods = await Promise.all(goodsA.map(async (good) => {
                const imageUrl = await this.fileService.getFile(good.id);
                return {
                    ...good.toJSON(),
                    url: imageUrl.url,
                    imageUrl:imageUrl.imageUrl
                };
            }));
            return goods;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getGood(id:number){
        try{
            const good=await this.goodRepository.findOne({where:{id}});
            const pictures=await this.fileService.getFiles(id);
            return{
                good:good,
                pictures
            } 
        }
        catch(e){
            console.log(e)
        }
    }
}
