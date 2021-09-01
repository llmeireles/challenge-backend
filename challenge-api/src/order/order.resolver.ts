import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomerService } from "src/customer/customer.service";
import { CustomerDTO } from "src/customer/dto/customerDTO";
import { OrderDTO } from "./dto/orderDTO";
import { OrderDTOCreateInput } from "./dto/orderDTO.create.input";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";

@Resolver(of => OrderDTO)
export class OrderResolver{
    
    constructor(private readonly orderService : OrderService, 
                private readonly customerService:CustomerService){

    }

    @Query(returns => [OrderDTO], {name : 'getAllOrders'})
    async getAllOrders() : Promise<OrderDTO[]>{
        return await this.orderService.findAll()
    }

    @Mutation(returns => OrderDTO, { name: 'createOrder'})
        async createOrder(
            @Args('input')input:OrderDTOCreateInput) : Promise<OrderDTO>{
               // console.log(input)
                const orderEntity  = new Order()
                orderEntity.idClient = input.idClient
                orderEntity.date = input.date
                orderEntity.status = input.status
                orderEntity.totalValue = input.totalValue
                orderEntity.channel = input.channel;

                return await this.orderService.create(orderEntity)
            }

    @Mutation(returns => OrderDTO, { name: 'getOrdersCli', nullable:true})
        async getOrdersCli(
            @Args('input')input:OrderDTOCreateInput) : Promise<OrderDTO>{
             
                const orderEntity  = new Order()
                orderEntity.idClient = input.idClient
                orderEntity.date = input.date
                orderEntity.status = input.status
                orderEntity.totalValue = input.totalValue
                orderEntity.channel = input.channel

                const customerDto = new CustomerDTO(this.customerService);
                const dados = await customerDto.getClientes();
                
                return await this.orderService.findAllCompleto(orderEntity)
            } 
    
    

}