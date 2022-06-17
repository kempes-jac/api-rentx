import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import { IMailProvider } from "../IMailProvider";
import fs from "fs";
import Handlebars from "handlebars"; 

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(
      account => {
          this.client = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth:{
              user: account.user,
              pass: account.pass
            }
        })
      }
    ).catch(
      error => console.error(error)
    );
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

    console.log(`Message send: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
    
  }

}

export { EtherealMailProvider }