import { Customer } from "src/customer/customer.entity";
import { Item } from "src/items/item.entity";
import { Store } from "src/store/store.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class Order{
   
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    idClient: number

    @Column()
    date: Date;

    @Column({type:'numeric'})
    totalValue: number;

    @Column()
    status: number;

    @Column()
    channel: string

    @Column({nullable:true})
    isPicked: boolean

    @Column({nullable:true})
    isStockout: boolean

    @ManyToOne(type=> Customer, customer=> customer.id)
    customer:Customer

    @ManyToOne(type=> Store, store => store.id, {nullable:true})
    store:Store

    @OneToMany(type=> Item, item => item.order, {cascade:['insert']})
    items: Item[]

}