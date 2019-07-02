import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Get('/')
  async findAll() {
    return await this.orderService.findAll();
  }

  @Post('/')
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }
}
