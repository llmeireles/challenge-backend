import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({length:150, nullable:false})
    name: string

    @Column({length:14, nullable:false})
    document:string

    @Column({length:200,nullable:false})
    address:string
    
    @Column({nullable:false})
    number:string

    @Column({length:150})
    complement:string

    @Column({length:100, nullable:false})
    neighborhood:string

    @Column({length:100, nullable:false})
    city:string

    @Column({length:20})
    state:string

}