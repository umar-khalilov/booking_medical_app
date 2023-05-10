import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointment.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Appointment.name,
                schema: AppointmentSchema,
            },
        ]),
    ],
    providers: [],
    controllers: [],
})
export class AppointmentModule {}
