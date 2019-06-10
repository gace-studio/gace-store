import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, Unique } from 'typeorm';
import { Media } from '../media/media.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

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
  stock: number;

  @Column('int', {
    default: 0,
  })
  status: number;

  @ManyToMany(type => Media, media => media.products)
  images: Media[];
}
