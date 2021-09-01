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
}