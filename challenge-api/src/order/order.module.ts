import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { Order } from './order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order]),TypeOrmModule.forFeature([Customer])],
    providers:[OrderService, OrderResolver, CustomerService]
})
export class OrderModule{}