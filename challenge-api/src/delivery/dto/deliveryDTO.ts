import { Field, InputType, ObjectType } from "@nestjs/graphql";



@InputType('Delivery')
export class DeliveryDTO{

    @Field({name:'Transporter'})
    transporter: string

    @Field({name:'TrackingNumber'})
    trackingNumber: string

    @Field({name:'Address'})
    address: string

    @Field({name:'Number'})
    number: string

    @Field({name:'Complement'})
    complement: string

    @Field({name:'Neighborhood'})
    neighborhood: string

    @Field({name:'City'})
    city: string

    @Field({name:'State'})
    state: string
}