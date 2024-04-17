import { Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import * as path from "node:path";

@Injectable()
export class UploadService {
  async mergeChunks(filename: string, totalChunks: number) {
    const uploadPath = path.join(__dirname, "..", "..", "uploads");

    const writeStream = fs.createWriteStream(`${uploadPath}/${filename}`);
    for (let i = 0; i < totalChunks; i++) {
      const chunkFilePath = `${uploadPath}/${filename}.part_${i}`;
      const chunkBuffer = await fs.promises.readFile(chunkFilePath);
      writeStream.write(chunkBuffer);
      fs.unlinkSync(chunkFilePath);
    }

    writeStream.end();
  }
}
