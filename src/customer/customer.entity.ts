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

  constructor(customer: any = {}) {
    this.fullname = customer.fullname;
    this.email = customer.email;
    this.phone = customer.phone;
  }
}
