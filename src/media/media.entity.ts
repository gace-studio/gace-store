import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({
    default: 0,
  })
  type: number;

  @ManyToMany(type => Product, product => product.images)
  @JoinTable()
  products: Product[];
}
