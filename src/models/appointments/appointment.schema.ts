import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Transform } from 'class-transformer';

@Schema({
    versionKey: false,
})
export class Appointment {
    @Transform(({ value }) => value.toString())
    readonly _id: Types.ObjectId;

    @Prop({
        type: SchemaTypes.Date,
        required: true,
    })
    readonly date: string;

    @Prop({
        type: SchemaTypes.UUID,
        required: true,
    })
    readonly userId: string;

    @Prop({
        type: SchemaTypes.UUID,
        required: true,
    })
    readonly doctorId: string;

    @Prop({ type: Boolean, required: true })
    readonly isActive: boolean;
}

export type AppointmentDocument = HydratedDocument<Appointment>;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
