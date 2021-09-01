import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CustomerService } from "../customer.service";


@InputType('Customer')
@ObjectType('Customer')
export class CustomerDTO{

    constructor(private readonly customerService: CustomerService){}

    @Field({name:'Name'})
    name: string

    @Field({nullable:true, name:'Document'})
    document:string

    @Field({nullable:true, name:'Adress'})
    address:string
    
    @Field({nullable:true, name:'Number'})
    number:string

    @Field({nullable:true, name:'Complement'})
    complement:string

    @Field({nullable:true, name:'Neighborhood'})
    neighborhood:string

    @Field({nullable:true, name:'City'})
    city:string

    @Field({nullable:true, name:'State'})
    state:string

    public async getClientes() {
        return await this.customerService.findAll()    
    }
}