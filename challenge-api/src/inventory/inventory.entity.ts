import { Product } from "src/product/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Inventory{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    createdAt: Date

    @Column()
    quantity:number

    @ManyToOne(type=> Product)
    product:Product
    
}