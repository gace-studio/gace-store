import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { Delivery } from 'src/delivery/delivery.entity';
import { Customer } from 'src/customer/customer.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', {
    default: 0,
  })
  status: number;

  @Column('datetime')
  orderDate: Date;

  @OneToMany(type => OrderDetail, orderDetail => orderDetail.order, {
    cascade: true,
  })
  orderDetails: OrderDetail[];

  @OneToOne(type => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToOne(type => Delivery, delivery => delivery.order)
  delivery: Delivery;

  constructor(order: any = {}) {
    this.orderDate = order.orderDate || new Date(Date.now());
    this.status = order.status || 1;
  }
}

export interface IOrder {
  status: number;
  orderDate: Date;
  orderDetails?: OrderDetail[];
  customer: string;
}
