import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Media } from 'src/media/media.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn()
  sku: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  price: number;

  @Column()
  capitalCost: number;

  @Column()
  stock: number;

  @Column({
    default: 0,
  })
  status: number;

  @ManyToMany(type => Media, media => media.products)
  images: Media[];
}
