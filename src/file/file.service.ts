import { Injectable } from '@nestjs/common';
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './file.model';

@Injectable()
export class FileService {
    private readonly s3Client: S3Client;

    constructor(@InjectModel(File) private fileRepository: typeof File) {
        this.s3Client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_ACCESS_SECRET_KEY
            }
        });
    }

    async uploadFile(files: Express.Multer.File[], goodId: number, transaction: any) {
        const uploadedFiles = [];
        for (const file of files) {
            const name = uuidv4();
            try {
                await this.s3Client.send(new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: name,
                    Body: file.buffer
                }));

                const image = await this.fileRepository.create({ name, url: name, goodId }, { transaction });
                uploadedFiles.push(image);
            } catch (error) {
                console.error("Error uploading file to S3:", error);
                throw error;
            }
        }
    }

    async deleteFile(name: string) {
        try {
            await this.s3Client.send(new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: name
            }));
            const image = await this.fileRepository.destroy({ where: { name } });
            return image;
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    async getFile(name: number) {
        try {
            const file=await this.fileRepository.findAll({where:{goodId:name}});
            const firstImage=file[0].name

            const command=new GetObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: firstImage
            })
    
            await this.s3Client.send(command);
            const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
            return {url:url,imageUrl:firstImage};
        } catch (e) {
            console.log(e)
        }
    }
    
    async getFiles(id: number) {
        try {
            const files = await this.fileRepository.findAll({ where: { goodId: id } });
            const arr=await Promise.all(files.map(async(item)=>{
                const command=new GetObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: item.url
                })
                await this.s3Client.send(command);
                const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
                return url
            }))
            return arr;
        } catch (error) {
            throw new Error('Не вдалося отримати файли');
        }
    }
    
    
}
