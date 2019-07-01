import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from './media/media.module';
import { join } from 'path';
import { OrderModule } from './order/order.module';
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
    OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
