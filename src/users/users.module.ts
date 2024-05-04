import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { OrderModel } from 'src/orders/orders.model';
import { Admin } from './admin.model';
import { Order } from 'src/order/order.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    SequelizeModule.forFeature([User,OrderModel,Admin,Order]),
    forwardRef(()=>AuthModule),
    JwtModule
  ],
  exports:[
    UsersService,
  ]
})
export class UsersModule {}
