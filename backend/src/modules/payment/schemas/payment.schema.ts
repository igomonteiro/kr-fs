import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Contract } from "../../contract/schemas/contract.schema";
import { Customer } from "../../customer/schemas/customer.schema";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop()
  installment_number: number;

  @Prop()
  agency: number;

  @Prop()
  card_number: number;

  @Prop()
  card_description: string;

  @Prop()
  proposal_number: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Customer" })
  customer: Customer;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }] })
  contracts: Contract[];

  @Prop()
  is_valid: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
