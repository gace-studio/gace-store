import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../product/product.entity';
import { Order } from './order.entity';
@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Order, order => order.orderDetails)
  order: Order;

  @Column('float')
  capitalCost: number;

  @Column('float', {
    nullable: false,
  })
  price: number;

  @Column('int')
  quantity: number;

  @OneToOne(type => Product)
  @JoinColumn()
  product: Product;
}
