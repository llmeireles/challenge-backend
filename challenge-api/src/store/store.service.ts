import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Store } from "./store.entity";


@Injectable()
export class StoreService{
    constructor(
        @InjectRepository(Store)
        private storeService: Repository<Store>
    ){}
}