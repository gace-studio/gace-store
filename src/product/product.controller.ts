import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { async } from 'rxjs/internal/scheduler/async';
@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) {
  }

  @Get('/shopee')
  async getShopeeProducts() {
    const data = await this.productService.getShopeeProducts();
    return data;
  }

  @Post('/boost')
  async boost(@Body('id') productId: number) {
    const res = await this.productService.boostShopeeProduct(productId);
    return res;
  }
}
