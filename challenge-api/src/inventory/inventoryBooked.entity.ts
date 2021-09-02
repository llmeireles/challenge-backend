import { type } from "os";
import { Order } from "src/order/order.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory.entity";


@Entity()
export class InventoryBooked{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type:'numeric', nullable:true})
    quantity:number

    @ManyToOne(type=>Inventory, invetory => invetory.id)
    inventory:Inventory

    @ManyToOne(type=> Order, order => order.id)
    order:Order

  
    
}