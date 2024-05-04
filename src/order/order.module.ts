import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrdersModule } from 'src/orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderModel } from 'src/orders/orders.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports:[OrdersModule,
  JwtModule,
  SequelizeModule.forFeature([Order,OrderModel]),
  MailModule],
  

})
export class OrderModule {}
