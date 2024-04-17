import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentModule } from "./modules/payment/payment.module";
import { UploadModule } from "./shared/upload/upload.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/payments"),
    PaymentModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
