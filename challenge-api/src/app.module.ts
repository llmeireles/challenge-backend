import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { InventoryModule } from './inventory/inventory.module';
import { ItemModule } from './items/item.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async(configService:ConfigService) => ({
          type:'postgres',
          url:configService.get('DATABASE_URL'),
          autoLoadEntities:true,
          synchronize:true, // não recomendado o uso em produção
           // entities:[Order],
          logging:true
      })
    }),

    GraphQLModule.forRoot({
      autoSchemaFile:'schema.gql'
    }),

    OrderModule,
    CustomerModule,
    ItemModule,
    StoreModule,
    ProductModule,
    InventoryModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
