import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from './media/media.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProductModule,
    MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
