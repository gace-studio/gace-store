import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetail } from './order-detail.entity';
import { Product } from '../product/product.entity';
import { Customer } from '../customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, Customer])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
