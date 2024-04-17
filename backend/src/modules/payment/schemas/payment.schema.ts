import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Contract } from "./contract.schema";
import { Customer } from "./customer.schema";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop()
  installment_number: number;

  @Prop()
  agency: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Customer" })
  customer: Customer;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }] })
  contract: Contract[];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
