import "dotenv/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentModule } from "./modules/payment/payment.module";
import { UploadModule } from "./shared/upload/upload.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { BullModule } from "@nestjs/bull";
import { CustomerModule } from "./modules/customer/customer.module";
import { ProductModule } from "./modules/product/product.module";
import { InstallmentModule } from "./modules/installment/installment.module";
import { env } from "./shared/config/env";

@Module({
  imports: [
    MongooseModule.forRoot(env.dbURL),
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: env.redisHost,
        port: 6379,
      },
    }),
    PaymentModule,
    CustomerModule,
    ProductModule,
    InstallmentModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
