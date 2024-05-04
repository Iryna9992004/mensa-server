import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    sendMailStatus(id:string,email:string,status:string){
        this.mailerService.sendMail({
            to:email,
            from:process.env.ADMIN_GMAIL,
            subject:'Замовлення',
            text:'Замовлення свічок',
            html:`<body>
            <h1>Статус замовлення:${status}</h1>
            <h2>Номер замовлення: ${id}</h2>
            <h2>Користувач: ${email}</h2>
            </body>`
        })
    }

}
