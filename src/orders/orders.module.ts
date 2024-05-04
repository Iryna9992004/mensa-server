import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderModel } from './orders.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [OrdersService],
  imports:[
    SequelizeModule.forFeature([User,OrderModel]),
    AuthModule
  ],
  exports:[
    OrdersService
  ]
})
export class OrdersModule {}
