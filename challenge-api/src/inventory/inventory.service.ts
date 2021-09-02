import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/order/order.entity";
import { Repository } from "typeorm";
import { InventoryBookedDTO } from "./dto/inventoryBookedDTO";
import { Inventory } from "./inventory.entity";
import { InventoryBooked } from "./inventoryBooked.entity";


@Injectable()
export class InventoryService{
    constructor(
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,

        @InjectRepository(InventoryBooked)
        private inventoryBookedRepository: Repository<InventoryBooked>
    ){}

    async getInventoryEntries(skuParameter:string):Promise<Inventory[]>{

        let inventoryReturn:Inventory[] = []
        
        if(skuParameter){
            let query = this.inventoryRepository
            .createQueryBuilder('inventory')
            .leftJoinAndMapOne("inventory.product", "inventory.product","product")
            .where('product.sku= :sku', {sku:skuParameter})
            .andWhere('inventory.quantity > :quantity',{quantity:0})
            
            inventoryReturn = await query.getMany()
        }

        return inventoryReturn
    }

    async bookStock(bookStock:InventoryBookedDTO){

        const inventoryBooked =  new InventoryBooked()
        inventoryBooked.quantity = bookStock.quantity
        inventoryBooked.inventory = new Inventory()
        inventoryBooked.inventory.id =  bookStock.inventory_id

        inventoryBooked.order =  new Order()
        inventoryBooked.order.id = bookStock.order_id

        await this.inventoryBookedRepository.save(inventoryBooked)

    }

    async inventoryUpdate(idInventory:string, QuantityAvailable:number){
        await this.inventoryRepository.update({id:idInventory},{quantity:QuantityAvailable})
    }

    async getQuantityAvailable(skuParameter:string):Promise<number>{

        if(skuParameter){
            let query = this.inventoryRepository
            .createQueryBuilder('inventory')
            .select("SUM(inventory.quantity)", "value")
            .innerJoin("inventory.product", "product")
            .where('product.sku= :sku', {sku:skuParameter})
            .andWhere('inventory.quantity > :quantity',{quantity:0})
            
            let sum:{
                value:string
            } 
            sum = await query.getRawOne()
            return Number(sum.value)
        }
        return 0
        
    }
}

