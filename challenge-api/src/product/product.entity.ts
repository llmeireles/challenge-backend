import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({nullable:true})
    name:string

    @Column()
    sku:string

}