import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
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

  @Column({
    nullable: false,
  })
  customer: string;

  @Column({
    nullable: false,
  })
  phone: string;

  @Column({
    nullable: false,
  })
  province: string;

  @Column({
    nullable: false,
  })
  district: string;

  ward: string;

  @Column({
    nullable: false,
  })
  address: string;

  constructor(order: any = {}) {
    this.orderDate = order.orderDate || new Date(Date.now());
    this.status = order.status || 1;
    this.address = order.address;
    this.ward = order.ward;
    this.district = order.district;
    this.province = order.province;
    this.customer = order.customer;
  }
}
