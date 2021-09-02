import { Customer } from "src/customer/customer.entity";
import { Item } from "src/items/item.entity";
import { OrderDTOCreateInput } from "./dto/orderDTO.create.input";
import { Order } from "./order.entity";


export class OrderMapper{
    public static toEntity(input : OrderDTOCreateInput[]): Order[] {

        const orders:Order[] = [];


        (input).forEach(element => {
            const orderEntity  = new Order()
            orderEntity.idClient = element.Id
            orderEntity.date = element.Date
            orderEntity.status = element.Status
            orderEntity.totalValue = element.TotalValue
            orderEntity.channel = element.Channel
            orderEntity.items = []
    
            
            element.Items.map((item)=>{
                let itemObj = new Item()
    
                itemObj.name = item.Name,
                itemObj.sku = item.Sku,
                itemObj.quantity = Number(item.Quantity),
                itemObj.price = Number(item.Price)
                
                return(orderEntity.items.push(itemObj))
            })

            orderEntity.customer =  new Customer()
            orderEntity.customer.name = element.Customer.Name
            orderEntity.customer.document =  element.Customer.Document
            orderEntity.customer.address =  element.Customer.Address
            orderEntity.customer.number =  element.Customer.Number
            orderEntity.customer.complement =  element.Customer.Complement
            orderEntity.customer.neighborhood = element.Customer.Neighborhood
            orderEntity.customer.city =  element.Customer.City
            orderEntity.customer.state =  element.Customer.State

            orders.push(orderEntity)
        });

        //console.log("mapper", orders)
        return orders
    }
}