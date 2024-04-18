import { Installment } from "./Installments";
import { Product } from "./Product";

export type Contract = {
  number: number;
  date: string;
  installmentsQuantity: number;
  totalValue: number;
  product: Product;
  installments: Installment[];
};
