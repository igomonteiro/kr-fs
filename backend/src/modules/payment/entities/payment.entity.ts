import { Customer } from "src/modules/customer/entities/customer.entity";

export class Payment {
  constructor(
    readonly installmentNumber: number,
    readonly agency: number,
    readonly cardNumber: number,
    readonly cardDescription: string,
    readonly proposalNumber: number,
    readonly customer: Customer,
    readonly isValid: boolean,
  ) {}
}
