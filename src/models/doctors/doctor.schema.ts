import { ApiProperty } from '@nestjs/swagger';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { Base } from '../base/base.schema';
import { Appointment } from '../appointments/appointment.schema';
import { Specializes } from '@/common/enums/specializes.enum';
import { Schema } from '@/common/decorators/schema.decorator';

@Schema({
    inheritOptions: true,
})
export class Doctor extends Base {
    @ApiProperty({
        example: Specializes.THERAPIST,
        enum: Specializes,
        description: 'List of specializes',
    })
    @Prop({ type: String, enum: Specializes, required: true })
    readonly spec: Specializes;

    @ApiProperty({
        example: false,
        description: 'The doctor is free or not',
    })
    @Prop({ type: Boolean, required: false, default: false })
    readonly free: boolean;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Appointment' }],
    })
    @Type(() => Appointment)
    readonly appointments_accepted: Appointment[];
}

export type DoctorDocument = HydratedDocument<Doctor>;
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
