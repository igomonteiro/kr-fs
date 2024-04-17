import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop()
  code: number;

  @Prop()
  name: string;

  @Prop()
  document: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
