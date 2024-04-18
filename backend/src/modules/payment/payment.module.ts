import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Payment, PaymentSchema } from "./schemas/payment.schema";
import { Contract, ContractSchema } from "../contract/schemas/contract.schema";
import { PaymentUploadedListener } from "./listeners/payment-uploaded.listener";
import { BullModule } from "@nestjs/bull";
import { PaymentConsumer } from "./payment.consumer";
import { Customer, CustomerSchema } from "../customer/schemas/customer.schema";
import {
  Installment,
  InstallmentSchema,
} from "../installment/schemas/installment.schema";
import { Product, ProductSchema } from "../product/schemas/product.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
      {
        name: Contract.name,
        schema: ContractSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Installment.name,
        schema: InstallmentSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    BullModule.registerQueue({
      name: "payments",
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentUploadedListener, PaymentConsumer],
})
export class PaymentModule {}
