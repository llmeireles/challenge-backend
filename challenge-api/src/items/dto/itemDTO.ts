import { Field, InputType, ObjectType } from "@nestjs/graphql";


@InputType('Items')
export class ItemsDTO{

    @Field()
    Id:string

    @Field({nullable:true})
    Sku: string

    @Field({nullable:true})
    Name:string

    @Field({nullable:true})
    Quantity: string

    @Field({nullable:true})
    Price:string

}