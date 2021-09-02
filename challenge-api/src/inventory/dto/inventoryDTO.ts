import { Field, InputType, ObjectType } from "@nestjs/graphql"



@ObjectType('Inventory')
@InputType('InventoryInput')
export class InventoryDTO{

    @Field({nullable:true})
    id: string

    @Field({nullable:true})
    product_id:string

    @Field()
    sku:string

    @Field({nullable:true})
    create_at:Date

    @Field({nullable:true})
    quantity:number

}