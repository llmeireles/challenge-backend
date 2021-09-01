import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inventory } from "./inventory.entity";


@Injectable()
export class InventoryService{
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>
}