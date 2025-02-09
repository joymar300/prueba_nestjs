import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @Column({primary:true, generated: true})
    id:number;

  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @Column()
    price: number;
}
