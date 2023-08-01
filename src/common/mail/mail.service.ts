import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { AppointmentLinks } from '../types/appointment-links.type';

@Injectable()
export class MailService implements OnModuleInit {
    private logger: Logger;
    private config: ConfigService;
    private transport: Mail;

    public async onModuleInit(): Promise<void> {
        this.logger = new Logger(MailService.name);
        this.config = new ConfigService();
        this.transport = createTransport({
            host: this.config.get<string>('SMTP_HOST'),
            port: this.config.get<number>('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.config.get<string>('SMTP_USERNAME'),
                pass: this.config.get<string>('SMTP_PASSWORD'),
            },
        });
    }

    private async sendEmail(options: Mail.Options): Promise<Mail> {
        return this.transport
            .sendMail(options)
            .catch(error => {
                this.logger.error(error.message);
            })
            .finally(() => {
                this.logger.log('Message was sent successfully');
            });
    }

    public async sendAppointmentMail(
        email: string,
        links: AppointmentLinks,
    ): Promise<void> {
        const message: Mail.Options = {
            from: this.config.get<string>('SMTP_USERNAME'),
            to: email,
            subject: 'Appointment',
            html: `<article><h1>You have a new appointment, follow the link to accept: </h1> <a href='${links.confirmationUrl}'>${links.confirmationUrl}</a>
            <h1>Follow the link to decline: </h1> <a href='${links.rejectionUrl}'>${links.rejectionUrl}</a></article>`,
            date: new Date().toISOString(),
        };
        await this.sendEmail(message);
    }
}
