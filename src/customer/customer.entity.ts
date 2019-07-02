import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ShippingAddress } from 'src/shipping-address/shipping-address.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  fullname: string;

  @Column({
    nullable: false,
  })
  phone: string;

  email: string;

  @OneToOne(type => ShippingAddress)
  @JoinColumn()
  addresses: ShippingAddress;
}
