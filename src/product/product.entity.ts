import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  sku: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column('float', {
    nullable: false,
  })
  price: number;

  @Column('float')
  capitalCost: number;

  @Column('int')
  inStock: number;

  @Column('int', {
    default: 0,
  })
  status: number;

  @Column({
    type: 'simple-array',
  })
  images: string[];
}
