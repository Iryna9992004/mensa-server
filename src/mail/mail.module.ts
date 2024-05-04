import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  providers: [MailService],
  imports:[
    MailerModule.forRoot({
      transport:{
        host:'smtp.gmail.com',
        port: 587, 
        secure: false,
        auth:{
          user:'iren171302@gmail.com',
          pass:'ynfaauyhxabgfgmf'
        }
      }
    })
  ],
  exports:[MailService]
})
export class MailModule {}
