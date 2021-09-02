import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Customer } from "src/customer/customer.entity";
import { CustomerService } from "src/customer/customer.service";
import { CustomerDTO } from "src/customer/dto/customerDTO";
import { StoreService } from "src/store/store.service";
import { OrderDTO } from "./dto/orderDTO";
import { OrderDTOCreateInput } from "./dto/orderDTO.create.input";
import { OrderDTOFilters } from "./dto/orderDTO.filters";
import { Order } from "./order.entity";
import { OrderMapper } from "./order.mapper";
import { OrderService } from "./order.service";

@Resolver(of => OrderDTO)
export class OrderResolver{
    
     constructor(private readonly orderService : OrderService, 
                private readonly customerService:CustomerService,
                private readonly storeService:StoreService){

    }

    @Query(returns => [OrderDTO], {name : 'getAllOrders'})
    async getAllOrders() : Promise<OrderDTO[]>{
        return await this.orderService.findAll()
    }

    @Mutation(returns =>[String], { name: 'createOrder', nullable:true})
    async createOrder(
        @Args({name:'input', type:() => [OrderDTOCreateInput]})input:OrderDTOCreateInput[]): Promise<String[]>{
           
            const orderEntity  = OrderMapper.toEntity(input)
            const returnOrders: String[] = []
            const customerDto =  new CustomerDTO(this.customerService)
            const storeSelecionada = await this.storeService.getStore()
            
            for(const order of orderEntity){
                
                const customerSelecionado = await customerDto.getCustomerByDocument(order.customer.document)
                order.store = storeSelecionada;
            
                try{

                    if(customerSelecionado === undefined ){
                        order.customer = await this.customerService.create(order.customer)
                    }
                    else{
                        order.customer = customerSelecionado
                    }
                    
                    
                    const retorno = await this.orderService.save_order_to_db(order)
                    returnOrders.push(retorno.idClient.toString())                   
                    
                }
                catch(ex){
                    console.log(ex.message)
                    return null
                }
            }
       
            return returnOrders

    }


    @Mutation(returns=> [OrderDTOFilters], {name:'get_orders', nullable:true})
    async get_orders(
        @Args({name:'filters', type:()=>OrderDTOFilters})filters:OrderDTOFilters):Promise<OrderDTOFilters[]>{

        const returnedOrders =  await this.orderService.findFilters(filters)
        const returnOdersFiltered : OrderDTOFilters[] = []
        
       
        for(const orderReturned of returnedOrders){
            try{
            const orderReturnedFiltered = new OrderDTOFilters()
            orderReturnedFiltered.id = orderReturned.id
            orderReturnedFiltered.external_id = orderReturned.idClient.toString()
            if(orderReturned.store){
                orderReturnedFiltered.store_id = orderReturned.store.id
            }
            orderReturnedFiltered.created_at = orderReturned.date
            orderReturnedFiltered.is_picked = orderReturned.isPicked
            orderReturnedFiltered.is_stockout = orderReturnedFiltered.is_stockout

            returnOdersFiltered.push(orderReturnedFiltered)
            }
            catch(ex){
                console.log(ex.message)
            }
        }
        
        return returnOdersFiltered;
        
        
    }

}