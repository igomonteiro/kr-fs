import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  code: number;

  @Prop()
  description: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
