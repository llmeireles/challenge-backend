import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType('OrderFilter')
@InputType('OrderFilters')
export class OrderDTOFilters{
    
    @Field({nullable:true})
    id: String;

    @Field({nullable:true})
    external_id: string

    @Field({nullable:true})
    store_id: string;

    @Field({nullable:true})
    created_at: Date;

    @Field({nullable:true})
    is_picked: boolean;


    @Field({nullable:true})
    is_stockout: boolean
}