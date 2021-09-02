import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { DeliveryDTO } from "src/delivery/dto/deliveryDTO";
import { InvoiceDTO } from "src/invoice/dto/invoiceDTO";
import { ItemsDTO } from "src/items/dto/itemDTO";
import { CustomerDTO } from "../../customer/dto/customerDTO";


@ObjectType()
@InputType()
export class OrderDTOCreateInput{

    @Field({nullable:false})
    Id: number

    @Field({nullable:false})
    Date: Date;

    @Field({nullable:false})
    TotalValue: number;

    @Field({nullable:false})
    Status: number;

    @Field({nullable:false})
    Channel: string

    @Field(type => CustomerDTO)
    Customer:CustomerDTO

    @Field(type=> InvoiceDTO)
    Invoice:InvoiceDTO

    @Field(type=>[DeliveryDTO])
    Delivery:DeliveryDTO[]

    @Field(type=> [ItemsDTO])
    Items:ItemsDTO[]
}