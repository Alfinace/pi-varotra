import { Injectable } from '@nestjs/common';
import * as Sib from 'sib-api-v3-sdk'
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
}
