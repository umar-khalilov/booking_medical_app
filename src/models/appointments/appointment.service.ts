import { URL } from 'node:url';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { MailService } from '@/common/mail/mail.service';
import { DoctorService } from '../doctors/doctor.service';
import { UserService } from '../users/user.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentDto } from './dto/appointment.dto';
import { IAppointmentLinks } from '@/common/interfaces/appointment-links.interface';
import { ConfirmationDto } from './dto/confirmation.dto';
import { RejectionDto } from './dto/rejection.dto';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment.name)
        private readonly appointmentModel: Model<AppointmentDocument>,
        private readonly config: ConfigService,
        private readonly mailService: MailService,
        private readonly doctorService: DoctorService,
        private readonly userService: UserService,
    ) {}

    async createOne(data: CreateAppointmentDto): Promise<AppointmentDto> {
        const [{ id: doctorId, email }, { id: userId }] = await Promise.all([
            this.doctorService.findOne(data.doctor),
            this.userService.findOne(data.user),
        ]);
        const isActive = this.isDateActive(data.date);
        const createdAppointment = new this.appointmentModel({
            ...data,
            active: isActive,
        });
        const appointmentInstance = await createdAppointment.save();
        const appointment = new AppointmentDto(appointmentInstance);
        if (isActive) {
            const links = this.createAppointmentLinks(
                doctorId,
                userId,
                String(appointment.id),
            );
            await this.mailService.sendAppointmentMail(email, links);
        }
        return appointment;
    }

    async fetchAll(): Promise<Array<AppointmentDto>> {
        const appointments = await this.appointmentModel.find();
        if (!appointments.length) {
            throw new NotFoundException('Not found appointments in database');
        }
        return appointments.map(appointment => new AppointmentDto(appointment));
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

    async removeOne(id: string): Promise<Appointment> {
        const removedAppointment =
            await this.appointmentModel.findByIdAndDelete(id);
        if (!removedAppointment) {
            throw new NotFoundException(
                `Appointment with that id: ${id} not found`,
            );
        }
        return removedAppointment;
    }

    async findNativeAppointment(id: string): Promise<AppointmentDocument> {
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) {
            throw new NotFoundException(
                `Appointment with that id: ${id} not found`,
            );
        }
        return appointment;
    }

    async confirmAppointment(data: ConfirmationDto): Promise<void> {
        const { doctorId, userId, appointmentId } = data;
        const [doctor, user, appointment] = await Promise.all([
            this.doctorService.findNativeDoctor(doctorId),
            this.userService.findNativeUser(userId),
            this.findNativeAppointment(appointmentId),
        ]);
        doctor.appointments_accepted.push(appointment);
        user.appointments.push(appointment);
        await doctor.save();
        await user.save();
    }

    async rejectAppointment({ appointmentId }: RejectionDto): Promise<void> {
        await this.removeOne(appointmentId);
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

    private createAppointmentLinks(
        doctorId: string,
        userId: string,
        appointmentId: string,
    ): IAppointmentLinks {
        const baseUrl =
            this.config.get<string>('SERVER_URL') ||
            `http://localhost:${this.config.get<number>('SERVER_PORT')}`;

        const confirmationUrl = new URL(
            '/api/appointments/confirmation',
            baseUrl,
        );
        confirmationUrl.searchParams.set('doctorId', doctorId);
        confirmationUrl.searchParams.append('userId', userId);
        confirmationUrl.searchParams.append('appointmentId', appointmentId);

        const rejectionUrl = new URL('/api/appointments/rejection', baseUrl);
        rejectionUrl.searchParams.set('appointmentId', appointmentId);

        return {
            confirmationUrl: confirmationUrl.toString(),
            rejectionUrl: rejectionUrl.toString(),
        };
    }
}
