import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { ShippingAddress } from 'src/shipping-address/shipping-address.entity';
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

  @OneToMany(type => OrderDetail, orderDetail => orderDetail.order)
  orderDetails: OrderDetail[];

  @OneToOne(type => ShippingAddress)
  @JoinColumn()
  shippingAddress: ShippingAddress;

  @OneToOne(type => Customer)
  @JoinColumn()
  customer: Customer;
}
