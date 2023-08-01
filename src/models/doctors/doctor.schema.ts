import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { BaseSchema } from '../base/base.schema';
import { Appointment } from '../appointments/appointment.schema';
import { Specializes } from '@/common/enums/specializes.enum';

@Schema({
    versionKey: false,
    // toJSON: {
    //     transform: (_, ret) => {
    //         ret.id = ret._id;
    //         delete ret._id;
    //     },
    // },
})
export class Doctor extends BaseSchema {
    @Prop({ type: String, enum: Specializes, required: true })
    readonly specialization: Specializes;

    @Prop({ type: Boolean, required: false, default: false })
    readonly isFree: boolean;

    @Prop({
        type: [{ type: Types.ObjectId, ref: Appointment.name }],
    })
    @Type(() => Appointment)
    readonly appointmentsAccepted: Appointment[];
}

export type DoctorDocument = HydratedDocument<Doctor>;
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
