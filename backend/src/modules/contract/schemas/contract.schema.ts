import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "../../product/schemas/product.schema";
import { Installment } from "src/modules/installment/schemas/installment.schema";

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
