import { Order } from "src/order/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Item{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    sku: string

    @Column()
    name:string

    @Column()
    quantity: number

    @Column()
    price:number

    @ManyToOne(type=> Order)
    order:Order
}