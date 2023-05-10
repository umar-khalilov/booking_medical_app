import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    ],
    providers: [AppointmentService],
    controllers: [AppointmentController],
})
export class AppointmentModule {}
