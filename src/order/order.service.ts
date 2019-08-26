import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { Order } from './order.entity';
import { OrderDetail } from './order-detail.entity';
import { Product } from '../product/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customer } from '../customer/customer.entity';
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
    let customer = await this.customerRepository.findOne({ phone: createOrderDto.phone });
    if (!customer) {
      customer = await this.customerRepository.save(
        new Customer({
          fullname: createOrderDto.customerName,
          phone: createOrderDto.phone,
          address: createOrderDto.address,
          district: createOrderDto.district,
          province: createOrderDto.province,
          ward: createOrderDto.ward,
        }),
      );
    }
    const orderDetails = await Promise.all(createOrderDto.orderDetails.map(async i => {
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
        return this.orderDetailRepository.save(orderDetail);
      } catch (err) {
        throw err;
      }
    }));
    let order = this.orderRepository.create({
      customer: {id: customer.id},
      orderDetails,
      address: createOrderDto.address,
      customerName: createOrderDto.customerName,
      district: createOrderDto.district,
      province: createOrderDto.province,
      phone: createOrderDto.phone,
      ward: createOrderDto.ward,
      deliveryName: createOrderDto.deliveryName,
    });
    order = await this.orderRepository.save(order);
    return order;
  }

}
