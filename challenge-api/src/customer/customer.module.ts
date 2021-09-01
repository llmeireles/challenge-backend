import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { Customer } from "./customer.entity";
import { CustomerService } from "./customer.service";


@Module({
    imports:[TypeOrmModule.forFeature([Customer])],
    providers:[CustomerService]
})
export class CustomerModule{}