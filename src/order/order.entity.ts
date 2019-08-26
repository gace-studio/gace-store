import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { Customer } from './../customer/customer.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', {
    default: 0,
  })
  status: number;

  @CreateDateColumn()
  orderDate: Date;

  @OneToMany(type => OrderDetail, orderDetail => orderDetail.order)
  orderDetails: OrderDetail[];

  @ManyToOne(type => Customer, c => c.orders)
  customer: Customer;

  @Column({
    nullable: false,
  })
  deliveryName: string;

  @Column()
  customerName: string;

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

  @Column()
  ward: string;

  @Column({
    nullable: false,
  })
  address: string;
}

export interface IOrder {
  status?: number;
  orderDate?: Date;
  customer?: Customer;
  orderDetails?: OrderDetail[];
  deliveryName?: string;
  customerName?: string;
  phone: string;
  province: string;
  district: string;
  ward?: string;
  address: string;
}
