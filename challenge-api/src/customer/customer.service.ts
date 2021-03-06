import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "./customer.entity";


@Injectable()
export class CustomerService{
    constructor(
        @InjectRepository(Customer)
        private customerRepository:Repository<Customer>
    ){}

    async findAll() : Promise<Customer[]>{

        return await this.customerRepository.find()
    }

    async findByFilters(filters:string) : Promise<Customer> {
        if (filters && filters != null){
            return await this.customerRepository.findOne({
                where:{
                    document: filters
                }
            })
        }

        return null
    }

    async create(input:Customer) : Promise<Customer>{
        return await this.customerRepository.save(input);
    }
}