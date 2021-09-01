import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Invoice{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({nullable:false})
    number: number

    @Column({nullable:false})
    serie:string

    @Column({nullable:false})
    accessKey:string

    @Column()
    issueDate:Date
    
    @Column()
    value:number
}