import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment.name)
        private readonly appointmentModel: Model<AppointmentDocument>,
    ) {}

    async createOne(data: CreateAppointmentDto): Promise<AppointmentDto> {
        const createdAppointment = new this.appointmentModel({
            ...data,
            active: this.isDateActive(data.date),
        });
        const appointmentInstance = await createdAppointment.save();
        return new AppointmentDto(appointmentInstance);
    }

    async fetchAll(): Promise<Array<AppointmentDto>> {
        const appointments = await this.appointmentModel.find();
        if (!appointments.length) {
            throw new NotFoundException('Not found appointments in database');
        }
        const normalizedAppointment = appointments.map(
            appointment => new AppointmentDto(appointment),
        );
        return normalizedAppointment;
    }

    async findOne(id: string): Promise<AppointmentDto> {
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) {
            throw new NotFoundException(
                `Appointment with that id: ${id} not found`,
            );
        }
        return new AppointmentDto(appointment);
    }

    private isDateActive(date: string): boolean {
        const appointedTimeInSecond: number = parseInt(
            String(new Date(date).getTime() / 1000),
            10,
        );
        const currentTimeInSecond: number = parseInt(
            String(Date.now() / 1000),
            10,
        );
        return currentTimeInSecond < appointedTimeInSecond;
    }
}
