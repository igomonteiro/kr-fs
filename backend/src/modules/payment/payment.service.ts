import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "./schemas/payment.schema";
import { Model } from "mongoose";
import { UploadFileDto } from "src/shared/upload/dto/upload-file.dto";
import * as fs from "node:fs";
import { UploadService } from "src/shared/upload/upload.service";
import { PaymentUploadedEvent } from "./events/payment-uploaded.event";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UPLOAD_PATH } from "src/shared/config/constants";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    private readonly uploadService: UploadService,
    private eventEmitter: EventEmitter2,
  ) {}

  async upload(file: Express.Multer.File, uploadFileDto: UploadFileDto) {
    const { key, totalChunks, filename } = uploadFileDto;
    const fileChunk = file.buffer;

    if (!fs.existsSync(UPLOAD_PATH)) {
      fs.mkdirSync(UPLOAD_PATH);
    }

    const chunkPath = `${UPLOAD_PATH}/${filename}.part_${key}`;

    await fs.promises.writeFile(chunkPath, fileChunk);

    if (key === totalChunks - 1) {
      await this.uploadService.mergeChunks(filename, totalChunks);
      const paymentUploadedEvent = new PaymentUploadedEvent();
      paymentUploadedEvent.filename = filename;
      this.eventEmitter.emit("payment.uploaded", paymentUploadedEvent);
    }
  }

  create(createPaymentDto: CreatePaymentDto) {
    const createdPayment = new this.paymentModel(createPaymentDto);
    return createdPayment.save();
  }

  async findAll(filters: {
    page?: number;
    limit?: number;
  }): Promise<{ totalCount: number; payments: Payment[] }> {
    const pageSize = filters.limit || 10;
    const totalCount = await this.paymentModel.countDocuments();
    const payments = await this.paymentModel
      .find()
      .populate("customer")
      .populate({
        path: "contracts",
        populate: {
          path: "installments product",
        },
      })
      .limit(pageSize)
      .skip(filters.page * pageSize);

    return {
      payments,
      totalCount,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }
}
