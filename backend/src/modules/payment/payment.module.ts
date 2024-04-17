import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Payment, PaymentSchema } from "./schemas/payment.schema";
import { Contract, ContractSchema } from "./schemas/contract.schema";
import { Product, ProductSchema } from "./schemas/product.schema";
import { Installment, InstallmentSchema } from "./schemas/installment.schema";
import { Customer, CustomerSchema } from "./schemas/customer.schema";

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
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
