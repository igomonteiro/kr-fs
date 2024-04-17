import { Installment } from "./Installments";
import { Product } from "./Product";

export type Contract = {
  number: number;
  date: Date;
  installmentsQuantity: number;
  totalValue: number;
  Product: Product;
  installments: Installment[];
};
