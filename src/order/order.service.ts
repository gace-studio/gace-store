import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { Order } from './order.entity';
import { OrderDetail } from './order-detail.entity';
import { Product } from '../product/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customer } from '../customer/customer.entity';
import { async } from 'rxjs/internal/scheduler/async';
@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
  ) { }
  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['orderDetails', 'orderDetails.product'],
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
    const customer = await this.customerRepository.findOne({ phone: createOrderDto.phone });
    if (!customer) {
      await this.customerRepository.save(new Customer({ fullname: createOrderDto.customer, phone: createOrderDto.phone }));
    }
    const order = new Order({
      customer: createOrderDto.customer,
      phone: createOrderDto.phone,
      address: createOrderDto.address,
      ward: createOrderDto.ward,
      district: createOrderDto.district,
      province: createOrderDto.province,
    });
    order.orderDetails = await Promise.all(createOrderDto.orderDetails.map(async i => {
      try {
        let price = i.price;
        let capitalCost = i.capitalCost;
        if (!price || !capitalCost) {
          const product = await this.productRepository.findOne(i.productId);
          price = product.price;
          capitalCost = product.capitalCost;
        }
        const orderDetail = new OrderDetail();
        orderDetail.capitalCost = capitalCost;
        orderDetail.price = price;
        orderDetail.product = { id: i.productId } as any;
        orderDetail.quantity = i.quantity;
        return await this.orderDetailRepository.create(orderDetail);
      } catch (err) {
        throw err;
      }
    }));
    return await this.orderRepository.save(order);
  }

}
