import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PaymentUploadedEvent } from "../events/payment-uploaded.event";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { UPLOAD_PATH } from "src/shared/config/constants";
import * as fs from "node:fs";
import * as csvParser from "csv-parser";
import { Customer } from "src/modules/customer/entities/customer.entity";
import { toISODate } from "src/shared/utils/dateUtils";

@Injectable()
export class PaymentUploadedListener {
  constructor(@InjectQueue("payments") private readonly paymentQueue: Queue) {}
  private readonly logger = new Logger(PaymentUploadedListener.name);

  @OnEvent("payment.uploaded")
  handlePaymentUploadedEvent(event: PaymentUploadedEvent) {
    const filePath = `${UPLOAD_PATH}/${event.filename}`;
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        try {
          // Just to validate if the CPF/CNPJ is valid, if not, throw error and not queue that data
          new Customer(data.cdClient, data.nmClient, data.nrCpfCnpj);
          const parsedData = {
            installmentNumber: data.nrInst,
            agency: data.nrAgencia,
            customerCode: data.cdClient,
            customerName: data.nmClient,
            customerDocument: data.nrCpfCnpj,
            contractNumber: data.nrContrato,
            contractDate: toISODate(data.dtContrato),
            installmentsQuantity: data.qtPrestacoes,
            totalValue: data.vlTotal,
            productCode: data.cdProduto,
            productDescription: data.dsProduto,
            cardNumber: data.cdCarteira,
            cardDescription: data.dsCarteira,
            proposalNumber: data.nrProposta,
            sequenceNumber: data.nrPresta,
            installmentType: data.tpPresta,
            installmentExpirationDate: toISODate(data.dtVctPre),
            installmentValue: data.vlPresta,
            lateFee: data.vlMora,
            penaltyValue: data.vlMulta,
            otherIncrease: data.vlOutAcr,
            iof: data.vlIof,
            discount: data.vlDescon,
            currentValue: data.vlAtual,
            status: data.idSituac,
            expirationStatus: data.idSitVen,
          };

          this.paymentQueue.add("payment.row", parsedData);
        } catch (err) {
          this.logger.warn(
            `This row will not be sent to the queue, probably a normal validation error: ${err.message}`,
          );
        }
      })
      .on("error", (err) => {
        this.logger.error(`Error reading file: ${err.message}`);
      });
  }
}
