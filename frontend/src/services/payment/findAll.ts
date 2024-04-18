import { Payment } from "@/@types/Payment";
import { httpClient } from "../httpClient";
import { Customer } from "@/@types/Customer";
import { Contract } from "@/@types/Contract";
import { Product } from "@/@types/Product";
import { Installment } from "@/@types/Installments";

export async function findAll(page: number = 0, limit: number = 10) {
  const { data } = await httpClient.get(
    `/payments?page=${page}&limit=${limit}`,
  );
  return {
    payments: data.payments.map((paymentData: any) =>
      mapPaymentToDomain(paymentData),
    ),
    totalCount: data.totalCount,
  };
}

function mapPaymentToDomain(data: any): Payment {
  return {
    installmentNumber: data.installment_number,
    agency: data.agency,
    cardNumber: data.card_number,
    cardDescription: data.card_description,
    proposalNumber: data.proposal_number,
    customer: mapCustomerToDomain(data.customer),
    contracts: data.contracts.map((contract: any) =>
      mapContractToDomain(contract),
    ),
    isValid: data.is_valid,
  };
}

function mapCustomerToDomain(data: any): Customer {
  return {
    code: data.code,
    name: data.name,
    document: data.document,
  };
}

function mapContractToDomain(data: any): Contract {
  return {
    number: data.number,
    date: data.date,
    installments: data.installments.map((installment: any) =>
      mapInstallmentsToDomain(installment),
    ),
    installmentsQuantity: data.installments_quantity,
    product: mapProductToDomain(data.product),
    totalValue: data.total_value,
  };
}

function mapInstallmentsToDomain(data: any): Installment {
  return {
    currentValue: data.current_value,
    discount: data.discount,
    expirationDate: data.expiration_date,
    expirationStatus: data.expiration_status,
    iof: data.iof,
    lateFee: data.late_fee,
    otherIncrease: data.other_increase,
    penaltyValue: data.penalty_value,
    sequenceNumber: data.sequence_number,
    status: data.status,
    type: data.type,
    value: data.value,
  };
}

function mapProductToDomain(data: any): Product {
  return {
    code: data.code,
    description: data.description,
  };
}
