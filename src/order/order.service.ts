import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './order-detail.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }
  async findAll() {
    return await this.orderRepository.find();
  }

  async create() {
    return [];
  }

}
