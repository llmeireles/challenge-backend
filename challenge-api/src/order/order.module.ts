import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { Item } from 'src/items/item.entity';
import { Store } from 'src/store/store.entity';
import { StoreService } from 'src/store/store.service';
import { Order } from './order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Order]),TypeOrmModule.forFeature([Customer]), 
        TypeOrmModule.forFeature([Item]), TypeOrmModule.forFeature([Store])
    ],
    providers:[OrderService, OrderResolver, CustomerService, StoreService]
})
export class OrderModule{}