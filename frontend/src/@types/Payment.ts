import { Customer } from "./Customer";

export type Payment = {
  installmentNumber: number;
  agency: number;
  cardNumber: number;
  cardDescription: string;
  proposalNumber: number;
  customer: Customer;
  isValid: boolean;
};
