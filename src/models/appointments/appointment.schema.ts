import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { User } from '../users/user.schema';
import { Doctor } from '../doctors/doctor.schema';

@Schema()
export class Appointment {
    @Prop({
        type: Types.ObjectId,
        required: true,
        default: Types.ObjectId,
    })
    readonly id: Types.ObjectId;

    @Prop({
        type: SchemaTypes.Date,
        required: true,
    })
    readonly date: Date;

    @Prop({
        type: SchemaTypes.UUID,
        ref: 'User',
        required: true,
    })
    @Type(() => User)
    readonly user: User;

    @Prop({
        type: SchemaTypes.UUID,
        ref: Doctor.name,
        required: true,
    })
    @Type(() => Doctor)
    readonly doctor: Doctor;

    @Prop({ type: Boolean, required: true })
    readonly active: boolean;
}

export type AppointmentDocument = HydratedDocument<Appointment>;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
