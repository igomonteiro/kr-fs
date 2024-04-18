import { Installment } from "src/modules/installment/entities/installment.entity";
import { Product } from "src/modules/product/entities/product.entity";

export class Contract {
  private installments: Installment[];
  constructor(
    readonly number: number,
    readonly date: Date,
    readonly installmentsQuantity: number,
    readonly totalValue: number,
    readonly Product: Product,
  ) {}

  addInstallment(installment: Installment) {
    this.installments.push(
      new Installment(
        installment.sequenceNumber,
        installment.type,
        installment.expirationDate,
        installment.value,
        installment.lateFee,
        installment.penaltyValue,
        installment.otherIncrease,
        installment.iof,
        installment.discount,
        installment.currentValue,
        installment.status,
        installment.expirationStatus,
      ),
    );
  }

  validate() {
    if (this.installments.length !== this.installmentsQuantity) {
      throw new Error(
        "Installments quantity does not corresponds to the specified quantity",
      );
    }

    const calculatedInstallmentsValue = Math.floor(
      this.totalValue / this.installmentsQuantity,
    );

    for (const installment of this.installments) {
      if (installment.value !== calculatedInstallmentsValue) {
        throw new Error("The value of one or more installments is incorrect.");
      }
    }
  }
}
