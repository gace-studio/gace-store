import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
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

  @Column()
  email: string;

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

  constructor(customer: ICustomer) {
    this.fullname = customer.fullname;
    this.email = customer.email;
    this.phone = customer.phone;
    this.address = customer.address;
    this.ward = customer.ward;
    this.district = customer.district;
    this.province = customer.province;
  }
}

export interface ICustomer {
  fullname: string;
  phone: string;
  email?: string;
  province: string;
  district: string;
  ward?: string;
  address: string;
}
