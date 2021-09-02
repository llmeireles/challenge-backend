import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Customer } from "../customer.entity";
import { CustomerService } from "../customer.service";


@InputType('Customer')

export class CustomerDTO{

    constructor(private readonly customerService: CustomerService){}

    @Field()
    Name: string

    @Field()
    Document:string

    @Field()
    Address:string
    
    @Field()
    Number:string

    @Field()
    Complement:string

    @Field()
    Neighborhood:string

    @Field()
    City:string

    @Field()
    State:string

    public async getClientes() {
        return await this.customerService.findAll()    
    }

    public async getCustomerByDocument(document:string){
        return await this.customerService.findByFilters(document)

    }
}