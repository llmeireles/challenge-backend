import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Customer } from "src/customer/customer.entity";
import { CustomerService } from "src/customer/customer.service";
import { CustomerDTO } from "src/customer/dto/customerDTO";
import { InventoryBookedDTO } from "src/inventory/dto/inventoryBookedDTO";
import { InventoryService } from "src/inventory/inventory.service";
import { StoreService } from "src/store/store.service";
import { OrderDTO } from "./dto/orderDTO";
import { OrderDTOCreateInput } from "./dto/orderDTO.create.input";
import { OrderDTOFilters } from "./dto/orderDTO.filters";
import { OrderDTOSku } from "./dto/orderDTO.sku";
import { Order } from "./order.entity";
import { OrderMapper } from "./order.mapper";
import { OrderService } from "./order.service";

@Resolver(of => OrderDTO)
export class OrderResolver{
    
     constructor(private readonly orderService : OrderService, 
                private readonly customerService:CustomerService,
                private readonly storeService:StoreService,
                private readonly inventoryService:InventoryService){

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

            try{

                for(const order of orderEntity){
                    
                    const customerSelecionado = await customerDto.getCustomerByDocument(order.customer.document)
                    order.store = storeSelecionada;

                
                    if(customerSelecionado === undefined ){
                        order.customer = await this.customerService.create(order.customer)
                    }
                    else{
                        order.customer = customerSelecionado
                    }
                    
                    await this.getStockAvailable(order)
                    if(order.isStockout){
                        const retorno = await this.orderService.saveOrderToDB(order)
                        await this.setBookedStock(order)
                        returnOrders.push(retorno.idClient.toString())                
                    }   
                        
                }
               
            }
            catch(ex){
                console.log(ex.message)
                return null
            }
       
            return returnOrders

    }

    async getStockAvailable(order:Order):Promise<Order>{

        order.isStockout = true

        for(const item of order.items){
            item.isStockout = true

            const stockAvailable = await this.inventoryService.getInventoryEntries(item.sku)
            let totalQuantityAvailable :number = 0
            stockAvailable.map((cValue) =>{
                totalQuantityAvailable += cValue.quantity

                return cValue
            })
            
            if(totalQuantityAvailable <= item.quantity){
                item.isStockout = false
                order.isStockout = false
            }
        }

        return order
    }

    async setBookedStock(order:Order){
        try{

            for(const item of order.items){
                let quantityItemOrder = item.quantity
                const inventoryAvailable = await this.inventoryService.getInventoryEntries(item.sku)

                for(const inventory of inventoryAvailable){

                    if(quantityItemOrder === 0)
                        break

                    if(quantityItemOrder <= inventory.quantity){
                        const bookedStock =  new InventoryBookedDTO()
                        bookedStock.inventory_id = inventory.id
                        bookedStock.order_id = order.id
                        bookedStock.quantity = quantityItemOrder

                        await this.inventoryService.bookStock(bookedStock);
                        inventory.quantity -= quantityItemOrder
                        quantityItemOrder -= quantityItemOrder
                        await this.inventoryService.inventoryUpdate(inventory.id,inventory.quantity)
                    }
                    else{

                        const bookedStock =  new InventoryBookedDTO()
                        bookedStock.inventory_id = inventory.id
                        bookedStock.order_id = order.id
                        bookedStock.quantity = inventory.quantity

                        await this.inventoryService.bookStock(bookedStock);
                        quantityItemOrder -= inventory.quantity
                        inventory.quantity -= inventory.quantity

                        await this.inventoryService.inventoryUpdate(inventory.id,inventory.quantity)
                    }

                }
            }
        }catch(ex){
            console.log(ex.message)
        }
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

    @Mutation(returns =>[OrderDTOSku], { name: 'stockAnalysis', nullable:true})
    async stockAnalysis(
        @Args({name:'input', type:() => OrderDTOCreateInput})input:OrderDTOCreateInput): Promise<OrderDTOSku[]>{
        
        const daysAtAnalysis:number = 15;
        const returnSkusOrder:OrderDTOSku[] = []

        
        for(const item of input.Items){
            let dateDeadLine:Date = new Date()
            let daysDeadLine : number = 0

            const averageQuantitySales = (await this.orderService.getSalesAverageSku(item.Sku, daysAtAnalysis))
            const quantityInStock= (await this.inventoryService.getQuantityAvailable(item.Sku))
            daysDeadLine = quantityInStock

            if(Math.round(averageQuantitySales) > 0)
            {
                daysDeadLine = Math.round(quantityInStock / averageQuantitySales)
            }

            const skuOrder = new OrderDTOSku()
            skuOrder.sku = item.Sku
            dateDeadLine = this.addDays(dateDeadLine, daysDeadLine)
            skuOrder.deadLine = dateDeadLine
            returnSkusOrder.push(skuOrder)

        }
        return returnSkusOrder
    }

    private addDays(date:Date, days:number):Date{
        console.log(date, days)
        date.setDate(date.getDate() + days)

        return date
    }

}