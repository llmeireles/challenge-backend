import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType('orderSku')
export class OrderDTOSku{

    @Field()
    sku:string
    
    @Field()
    deadLine:Date
}