import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrderModel } from "./orders/orders.model";
import { Admin } from "./users/admin.model";
import { FileModule } from './file/file.module';
import { GoodsModule } from './goods/goods.module';
import { Good } from "./goods/goods.model";
import { File } from "./file/file.model";
import { LikedModule } from './liked/liked.module';
import { Liked } from "./liked/liked.model";
import { OrderModule } from './order/order.module';
import { Order } from "./order/order.model";
import { MailModule } from './mail/mail.module';

@Module({
    imports:[
        ConfigModule.forRoot({
            envFilePath:`.env`
        }),
        SequelizeModule.forRoot({
            dialect:'postgres',
            host:process.env.POSTGRES_HOST,
            port:Number(process.env.POSTGRES_PORT),
            username:process.env.POSTGRES_USER,
            password:process.env.POSTGRES_PASSWORD,
            database:process.env.POSTGRES_DB,
            models:[User,OrderModel,Admin,Good,File,Liked,Order],
            autoLoadModels:true
        }),
        UsersModule,
        AuthModule,
        OrdersModule,
        FileModule,
        GoodsModule,
        LikedModule,
        OrderModule,
        MailModule
    ]
})
export class AppModule{}