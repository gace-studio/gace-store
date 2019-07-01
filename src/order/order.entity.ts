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

  @OneToMany(type => OrderDetail, orderDetail => orderDetail.order)
  orderDetails: OrderDetail[];
}
