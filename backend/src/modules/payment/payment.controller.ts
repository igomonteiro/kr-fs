import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  HttpCode,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "node:fs";
import * as path from "node:path";
import { UploadService } from "src/shared/upload/upload.service";
import { UploadFileDto } from "src/shared/upload/dto/upload-file.dto";

@Controller("payments")
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly uploadService: UploadService,
  ) {}

  @Post("upload")
  @HttpCode(204)
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    const { key, totalChunks, filename } = uploadFileDto;
    const fileChunk = file.buffer;

    const uploadPath = path.join(__dirname, "..", "..", "uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    const chunkPath = `${uploadPath}/${filename}.part_${key}`;

    await fs.promises.writeFile(chunkPath, fileChunk);

    if (key === totalChunks - 1) {
      await this.uploadService.mergeChunks(filename, totalChunks);
    }
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }
}
