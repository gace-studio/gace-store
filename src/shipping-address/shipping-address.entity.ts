import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

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
}
