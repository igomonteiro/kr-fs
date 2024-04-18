import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  page: number;

  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  limit: number;
}
