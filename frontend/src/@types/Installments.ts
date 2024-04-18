export enum InstallmentStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export enum InstallmentExpirationStatus {
  EXPIRED = "EXPIRED",
  REGULAR = "REGULAR",
}

export type Installment = {
  sequenceNumber: number;
  type: string;
  expirationDate: string;
  value: number;
  lateFee: number;
  penaltyValue: number;
  otherIncrease: number;
  iof: number;
  discount: number;
  currentValue: number;
  status: InstallmentStatus;
  expirationStatus: InstallmentExpirationStatus;
};
