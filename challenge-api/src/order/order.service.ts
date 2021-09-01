import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { throws } from "assert/strict";
import { Customer } from "src/customer/customer.entity";
import { FindOneOptions, FindOptionsUtils, Repository } from "typeorm";
import { Order } from "./order.entity";


@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(Order)
        private orderRepository : Repository<Order>
    ){}

    async findAll() : Promise<Order[]> {
       return this.orderRepository.find();
    }

    async create(input: Order): Promise<Order>{
       return this.orderRepository.save(input) 
    }

    async findAllCompleto(input: Order): Promise<Order>{
        
        return await this.orderRepository.findOne({
            where:{
                idClient:input.idClient
            }
        })
     }
}