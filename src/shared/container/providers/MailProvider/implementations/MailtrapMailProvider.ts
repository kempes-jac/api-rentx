import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import { IMailProvider } from "../IMailProvider";
import fs from "fs";
import Handlebars from "handlebars"; 


@injectable()
class MailtrapMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const mailPort = parseInt(process.env.MAIL_PORT)
    this.client = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: mailPort,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }


  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    const templateParse = Handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentex.com.br>",
      subject,
      html: templateHTML
    });
  }
}

export { MailtrapMailProvider }