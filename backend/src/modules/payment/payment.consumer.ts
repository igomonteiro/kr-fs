import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { Payment as PaymentSchema } from "./schemas/payment.schema";
import { Customer as CustomerSchema } from "../customer/schemas/customer.schema";
import { Contract as ContractSchema } from "../contract/schemas/contract.schema";
import { Product as ProductSchema } from "../product/schemas/product.schema";
import { Installment as InstallmentSchema } from "../installment/schemas/installment.schema";
import { Customer } from "../customer/entities/customer.entity";
import { Product } from "../product/entities/product.entity";
import {
  Installment,
  InstallmentExpirationStatus,
  InstallmentStatus,
} from "../installment/entities/installment.entity";
import { Contract } from "../contract/entities/contract.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "./entities/payment.entity";
import { Logger } from "@nestjs/common";

@Processor("payments")
export class PaymentConsumer {
  constructor(
    @InjectModel(PaymentSchema.name) private paymentModel: Model<PaymentSchema>,
    @InjectModel(CustomerSchema.name)
    private customerModel: Model<CustomerSchema>,
    @InjectModel(ProductSchema.name)
    private productModel: Model<ProductSchema>,
    @InjectModel(InstallmentSchema.name)
    private installmentModel: Model<InstallmentSchema>,
    @InjectModel(ContractSchema.name)
    private contractModel: Model<ContractSchema>,
  ) {}

  private readonly logger = new Logger(PaymentConsumer.name);

  @Process("payment.row")
  async handlePaymentRow(job: Job) {
    const {
      installmentNumber,
      agency,
      customerCode,
      customerName,
      customerDocument,
      contractNumber,
      contractDate,
      installmentsQuantity,
      totalValue,
      productCode,
      productDescription,
      cardNumber,
      cardDescription,
      proposalNumber,
      sequenceNumber,
      installmentType,
      installmentExpirationDate,
      installmentValue,
      lateFee,
      penaltyValue,
      otherIncrease,
      iof,
      discount,
      currentValue,
      status,
      expirationStatus,
    } = job.data;

    try {
      const customer = new Customer(
        customerCode,
        customerName,
        customerDocument,
      );
      const customerDb = await this.customerModel.findOneAndUpdate(
        { code: customer.code },
        {
          code: customer.code,
          name: customer.name,
          document: customer.document.value,
        },
        { upsert: true, new: true },
      );

      const product = new Product(productCode, productDescription);
      const productDb = await this.productModel.findOneAndUpdate(
        { code: product.code },
        { code: product.code, description: product.description },
        { upsert: true, new: true },
      );

      const installmentStatus =
        status === "Aberta" ? InstallmentStatus.OPEN : InstallmentStatus.CLOSED;
      const installmentExpirationStatus =
        expirationStatus === "Vencida"
          ? InstallmentExpirationStatus.EXPIRED
          : InstallmentExpirationStatus.REGULAR;

      const installment = new Installment(
        sequenceNumber,
        installmentType,
        installmentExpirationDate,
        installmentValue,
        lateFee,
        penaltyValue,
        otherIncrease,
        iof,
        discount,
        currentValue,
        installmentStatus,
        installmentExpirationStatus,
      );

      const installmentDb = new this.installmentModel({
        sequence_number: installment.sequenceNumber,
        type: installment.type,
        expiration_date: installment.expirationDate,
        value: installment.value,
        late_fee: installment.lateFee,
        penalty_value: installment.penaltyValue,
        other_increase: installment.otherIncrease,
        iof: installment.iof,
        discount: installment.discount,
        current_value: installment.currentValue,
        status: installment.status,
        expiration_status: installment.expirationStatus,
      });

      const contract = new Contract(
        contractNumber,
        contractDate,
        installmentsQuantity,
        totalValue,
        product,
      );

      const contractDb = new this.contractModel({
        number: contract.number,
        date: contract.date,
        installments_quantity: contract.installmentsQuantity,
        total_value: contract.totalValue,
        product: productDb,
        installments: [],
      });

      const contractExists = await this.contractModel.findOne({
        number: contract.number,
      });

      if (contractExists) {
        if (
          contractExists.installments.length !==
          contractExists.installments_quantity
        ) {
          contractExists.installments.push(installmentDb);
          await installmentDb.save();
          await contractExists.save();
        }
      } else {
        contractDb.installments.push(installmentDb);
        await installmentDb.save();
        await contractDb.save();
      }

      const payment = new Payment(
        installmentNumber,
        agency,
        cardNumber,
        cardDescription,
        proposalNumber,
        customer,
        false,
      );

      // VALIDAÇÕES DAS PRESTAÇÕES
      const calculatedInstallmentValue =
        Math.trunc(Number(totalValue)) / installmentsQuantity;
      const isValidInstallmentValue =
        installmentValue === calculatedInstallmentValue;
      const isConsistent =
        currentValue ===
        installmentValue + lateFee + penaltyValue + otherIncrease - discount;
      const isValidPayment =
        currentValue >= installmentValue &&
        isValidInstallmentValue &&
        isConsistent;

      const paymentDb = new this.paymentModel({
        agency: payment.agency,
        card_number: payment.cardNumber,
        card_description: payment.cardDescription,
        proposal_number: payment.proposalNumber,
        customer: customerDb,
        contracts: [],
        installment_number: payment.installmentNumber,
        is_valid: isValidPayment,
      });

      const paymentExists = await this.paymentModel
        .findOne({
          installment_number: payment.installmentNumber,
        })
        .populate("contracts");

      if (paymentExists) {
        if (
          !paymentExists.contracts.find((ct) => ct.number === contractDb.number)
        ) {
          paymentExists.contracts.push(contractDb);
          await paymentExists.save();
        }
      } else {
        paymentDb.contracts.push(contractDb);
        await paymentDb.save();
      }
    } catch (err) {
      this.logger.error(`Error consuming row: ${err.message}`);
    }
  }
}
