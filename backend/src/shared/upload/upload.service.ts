import { Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import { UPLOAD_PATH } from "../config/constants";

@Injectable()
export class UploadService {
  async mergeChunks(filename: string, totalChunks: number) {
    const writeStream = fs.createWriteStream(`${UPLOAD_PATH}/${filename}`);
    for (let i = 0; i < totalChunks; i++) {
      const chunkFilePath = `${UPLOAD_PATH}/${filename}.part_${i}`;
      const chunkBuffer = await fs.promises.readFile(chunkFilePath);
      writeStream.write(chunkBuffer);
      fs.unlinkSync(chunkFilePath);
    }

    writeStream.end();
  }
}
