export enum InstallmentStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export enum InstallmentExpirationStatus {
  EXPIRED = "EXPIRED",
  REGULAR = "REGULAR",
}

export type Installment = {
  readonly sequenceNumber: number;
  readonly type: string;
  readonly expirationDate: Date;
  readonly value: number;
  readonly lateFee: number;
  readonly penaltyValue: number;
  readonly otherIncrease: number;
  readonly iof: number;
  readonly discount: number;
  readonly currentValue: number;
  readonly status: InstallmentStatus;
  readonly expirationStatus: InstallmentExpirationStatus;
};
