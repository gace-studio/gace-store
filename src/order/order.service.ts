import { Injectable, Body, Post } from '@nestjs/common';
import { Repository, Transaction } from 'typeorm';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './order-detail.entity';
import { Product } from '../product/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { pick } from 'lodash';
@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }
  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['orderDetails', 'orderDetails.product']
    });
    orders.map(order => {
      order.orderDetails = order.orderDetails.map(item => {
        delete item.id;
        item.product = pick(item.product, ['id', 'name', 'images', 'sku']) as any;
        return item;
      });
      return order;
    });
    return orders;
  }
  async create(createOrderDto: CreateOrderDto) {
    let order = new Order();
    order.orderDate = new Date(Date.now());
    order.status = 1;
    order = this.orderRepository.create(order);
    order = await this.orderRepository.save(order);
    createOrderDto.orderDetails.forEach(async i => {
      let price = i.price;
      let capitalCost = i.capitalCost;
      if (!price || !capitalCost) {
        const product = await this.productRepository.findOne(i.productId);
        price = product.price;
        capitalCost = product.capitalCost;
      }
      let orderDetail = new OrderDetail();
      orderDetail.capitalCost = capitalCost;
      orderDetail.price = price;
      orderDetail.product = { id: i.productId } as any;
      orderDetail.quantity = i.quantity;
      orderDetail.order = order;
      orderDetail = this.orderDetailRepository.create(orderDetail);
      return await this.orderDetailRepository.save(orderDetail);
    });
    return this.orderRepository.findOne(order.id);
  }

}
