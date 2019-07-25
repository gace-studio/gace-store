import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Order } from 'dist/src/order/order.entity';
@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  deliveryName: string;

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

  @OneToOne(type => Order)
  @JoinColumn()
  order: Order;

  constructor(delivery: any = {}) {
    this.deliveryName = delivery.deliveryName;
    this.address = delivery.address;
    this.ward = delivery.ward;
    this.district = delivery.district;
    this.province = delivery.province;
    this.customer = delivery.customer;
  }
}
