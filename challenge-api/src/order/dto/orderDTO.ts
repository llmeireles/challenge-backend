import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType('Order')
export class OrderDTO{
    @Field({nullable:false})
    id: string;

    @Field({nullable:false})
    idClient: number

    @Field({nullable:false})
    date: Date;

    @Field({nullable:false})
    totalValue: number;

    @Field({nullable:false})
    status: number;

    @Field({nullable:false})
    channel: string
}