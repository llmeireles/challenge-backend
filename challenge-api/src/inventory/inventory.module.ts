import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inventory } from "./inventory.entity";
import { InventoResolver } from "./inventory.resolver";
import { InventoryService } from "./inventory.service";
import { InventoryBooked } from "./inventoryBooked.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Inventory, InventoryBooked])],
    providers:[InventoryService, InventoResolver]
})

export class InventoryModule{}
