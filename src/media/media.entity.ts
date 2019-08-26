import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column('int', {
    default: 0,
  })
  type: number;
}
