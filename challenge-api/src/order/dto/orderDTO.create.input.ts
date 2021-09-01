import { Field, InputType } from "@nestjs/graphql";
import { DeliveryDTO } from "src/delivery/dto/deliveryDTO";
import { InvoiceDTO } from "src/invoice/dto/invoiceDTO";
import { ItemsDTO } from "src/items/dto/itemDTO";
import { CustomerDTO } from "../../customer/dto/customerDTO";



@InputType()
export class OrderDTOCreateInput{

    @Field({nullable:false, name:'Id'})
    idClient: number

    @Field({nullable:false, name:'Date'})
    date: Date;

    @Field({nullable:false, name:'TotalValue'})
    totalValue: number;

    @Field({nullable:false, name:'Status'})
    status: number;

    @Field({nullable:false, name:'Channel'})
    channel: string

    @Field(type => [CustomerDTO], {name:'Customer'})
    customer:CustomerDTO

    @Field(type=> [InvoiceDTO], {name:'Invoice'})
    invoice:InvoiceDTO

    @Field(type=>[DeliveryDTO], {name:'Delivery'})
    delivery:DeliveryDTO[]

    @Field(type=> [ItemsDTO], {name:'Items'})
    items:ItemsDTO[]
}