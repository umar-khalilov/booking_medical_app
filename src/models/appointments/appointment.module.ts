import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '@/common/mail/mail.module';
import { DoctorModule } from '../doctors/doctor.module';
import { UserModule } from '../users/user.module';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Appointment.name,
                schema: AppointmentSchema,
            },
        ]),
        MailModule,
        DoctorModule,
        UserModule,
    ],
    providers: [AppointmentService],
    controllers: [AppointmentController],
})
export class AppointmentModule {}
