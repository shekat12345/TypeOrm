import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar"})
  gender: string;

  @Column({type:"varchar"})
  country: string;
}