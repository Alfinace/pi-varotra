import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as Sib from 'sib-api-v3-sdk'
import * as fs from 'fs'
import { promisify } from 'util';
const sleep = promisify(setTimeout);
require('dotenv').config()

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail({ to, subject, html }) {
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY_SENDINBLUE
    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
      email: process.env.SENDER_MAIL,
      name: 'Mpi-varotra dev',
    }
    const recevers = [{ email: to }]
    return await tranEmailApi
      .sendTransacEmail({
        sender,
        to: recevers,
        subject,
        htmlContent: html,
      })
  }

  async compressImage(inputPath: string, outputPath: string): Promise<void> {
    try {
      const readStream = fs.createReadStream(inputPath);
      const writeStream = fs.createWriteStream(outputPath);

      readStream.on('open', async () => {
        // Process the file with Sharp when the read stream opens
        await sharp(inputPath)
        .resize(900) // Resize width to 800px (optional, you can adjust as needed)
        .webp({ quality: 80 }) // Set WebP quality (1-100)
        .jpeg({ quality: 80 }) // Set JPEG quality (1-100)
        .png({ quality: 80 }) // Set PNG quality (1-100)
        .pipe(writeStream) // Pipe the result to the write stream
          .on('finish', () => {
            readStream.close();
            writeStream.close();
            return Promise.resolve();
          });
      });
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  }

  async deleteFile(path: string) {
      await sleep(5000)
      fs.unlink(path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });

  }

}
