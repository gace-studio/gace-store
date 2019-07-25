import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { MediaModule } from './media/media.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: null,
        database: 'gacestore',
        entities: [join(__dirname, '**/**.entity{.ts,.js}')],
        synchronize: true,
      },
    ),
    ProductModule,
    MediaModule,
    OrderModule,
    CustomerModule,
    DeliveryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
