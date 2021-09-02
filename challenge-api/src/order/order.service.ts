import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsUtils, Repository } from "typeorm";
import { OrderDTOFilters } from "./dto/orderDTO.filters";
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

    async saveOrderToDB(input: Order): Promise<Order>{
       try{

        return this.orderRepository.save(input) 
       }
       catch(ex){
           console.log(ex.message)
       }
    }

    async findFilters(input: OrderDTOFilters): Promise<Order[]>{

        let query = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndMapOne("order.store","order.store","store")
        .where("order.date >=:date",{date:"2021-01-01"});

        if(input.id){
            query = query.andWhere("order.id = :id", {id:input.id})
        }
        
        if(input.external_id){
            query = query.andWhere("order.idClient = :external_id", {external_id:input.external_id})
        }

        if(input.store_id){
            query = query.andWhere("order.storeId = :store_id", {store_id:input.store_id})
        }

        if(input.created_at){
            query = query.andWhere("order.date >= :date", {date:input.created_at})
        }

        if(input.is_picked){
            query = query.andWhere("order.isPicked = :isPicked", {isPicked:input.is_picked})
        }

        if(input.is_stockout){
            query = query.andWhere("order.isPicked = :isStockout", {isStockout:input.is_stockout})
        }
        
        const orders = await query.getMany()

    
        return orders

     }
}