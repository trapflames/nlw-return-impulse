import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'a83fabd75abbb9',
    pass: 'f0143521edf2e4',
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Feedget Team <hi@feedget.com>',
      to: 'Miguel Duarte <md@feeget.com>',
      subject,
      html: body,
    })
  }
}
