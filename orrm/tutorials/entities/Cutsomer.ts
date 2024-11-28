import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"; 

import {Details} from "./details"; 

@Entity() 
export class Customer { 

   @PrimaryGeneratedColumn()
   id: number; 
   
   @Column({type:"varchar"})
   name: string; 
   
   @OneToOne(type => Details) @JoinColumn() 
   details: Details;
}