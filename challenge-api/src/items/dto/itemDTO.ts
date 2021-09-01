import { Field, InputType, ObjectType } from "@nestjs/graphql";


@InputType('Items')
@ObjectType('Items')
export class ItemsDTO{

    @Field({name:'Id'})
    IdClient:string

    @Field({nullable:true, name:'Sku'})
    sku: string

    @Field({nullable:true, name:'Name'})
    name:string

    @Field({nullable:true, name:'Quantity'})
    quantity: number

    @Field({nullable:true, name :'Price'})
    price:number

}