import { Args, Query, Resolver } from "@nestjs/graphql";
import { InventoryDTO } from "./dto/inventoryDTO"
import { InventoryService } from "./inventory.service";


@Resolver(of => InventoryDTO)
export class InventoResolver{
    constructor(private readonly inventoryService:InventoryService){}

    @Query(returns => [InventoryDTO], {name : 'getInventoryEntries'})
    async getInventoryEntries(
        @Args({name:'sku', type:()=> String})sku:string):Promise<InventoryDTO[]>{

        const inventoryEntries = await this.inventoryService.getInventoryEntries(sku)
        let inventoryReturn :  InventoryDTO[] = []

        for(const inventoryEntry of inventoryEntries){
            const inventory =  new InventoryDTO();
            inventory.id = inventoryEntry.id
            inventory.product_id = inventoryEntry.product.id
            inventory.sku = inventoryEntry.product.sku
            inventory.create_at = inventoryEntry.createdAt
            inventory.quantity = inventoryEntry.quantity

            inventoryReturn.push(inventory)
        }

        return inventoryReturn
           
    }
}