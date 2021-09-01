import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inventory } from "./inventory.entity";
import { InventoryService } from "./inventory.service";


@Module({
    imports:[TypeOrmModule.forFeature([Inventory])],
    providers:[InventoryService]
})

export class InventoryModule{}
