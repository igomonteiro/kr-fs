import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from "class-validator";

export class UploadFileDto {
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  key: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  totalChunks: number;

  @IsString()
  @IsNotEmpty()
  filename: string;
}
