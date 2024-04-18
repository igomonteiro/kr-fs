import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {
  InstallmentExpirationStatus,
  InstallmentStatus,
} from "../entities/installment.entity";

export type InstallmentDocument = HydratedDocument<Installment>;

@Schema()
export class Installment {
  @Prop()
  sequence_number: number;

  @Prop()
  type: string;

  @Prop()
  expiration_date: Date;

  @Prop()
  value: number;

  @Prop()
  late_fee: number;

  @Prop()
  penalty_value: number;

  @Prop()
  other_increase: number;

  @Prop()
  iof: number;

  @Prop()
  discount: number;

  @Prop()
  current_value: number;

  @Prop({
    type: String,
    enum: InstallmentStatus,
  })
  status: string;

  @Prop({
    type: String,
    enum: InstallmentExpirationStatus,
  })
  expiration_status: string;
}

export const InstallmentSchema = SchemaFactory.createForClass(Installment);
