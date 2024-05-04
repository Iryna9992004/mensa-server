import { Injectable } from '@nestjs/common';
import { LikedDto } from './dto/LikedDto';
import { InjectModel } from '@nestjs/sequelize';
import { Liked } from './liked.model';
import { AuthService } from 'src/auth/auth.service';
import { GetObjectCommand,S3Client} from '@aws-sdk/client-s3';
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

@Injectable()
export class LikedService {
    private readonly s3Client: S3Client;
    constructor(@InjectModel(Liked) private likedRepository:typeof Liked,
    private authService:AuthService){
        this.s3Client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_ACCESS_SECRET_KEY
            }
        });
    }

  async add(dto: LikedDto, token: string) {
        try {
            const decodedToken = await this.authService.decodeToken(token)
            const userId = decodedToken.id;
            const liked = await this.likedRepository.create({...dto,userId:userId});
            return liked;
        } catch(e) {
            console.log(e);
        }
    }

    async delete(id:number){
        try{
            const liked=await this.likedRepository.destroy({where:{id}})
            return liked;
        }
        catch(e){
            console.log(e)
        }
    }

    async list(token){
        try{
            const decodedToken=await this.authService.decodeToken(token);
            const userId=decodedToken.id;
            const liked=await this.likedRepository.findAll({where:{userId}})
            let likedList=[]
            for(const like of liked){
                const command=new GetObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: like.url
                })
        
                await this.s3Client.send(command);
                const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

                likedList.push({name:like.name,id:like.id,price:like.price,url:url})
            }
            return likedList
        }
        catch(e){
            console.log(e)
        }
    }
    
}
