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
  Query,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadFileDto } from "src/shared/upload/dto/upload-file.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";

@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

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
    return this.paymentService.upload(file, uploadFileDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.paymentService.findAll(paginationDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }
}
