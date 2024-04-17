import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Installment } from "./installment.schema";
import { Product } from "./product.schema";

export type ContractDocument = HydratedDocument<Contract>;

@Schema()
export class Contract {
  @Prop()
  number: number;

  @Prop()
  date: Date;

  @Prop()
  installments_quantity: number;

  @Prop()
  total_value: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })
  product: Product;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Installment" }],
  })
  installments: Installment[];
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
