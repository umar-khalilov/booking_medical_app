import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Transform } from 'class-transformer';

@Schema()
export class Appointment {
    @ApiProperty({
        example: '645b9a596e6a640b2cd325b4',
        description: 'Primary key',
        type: 'string',
        format: 'ObjectId',
        readOnly: true,
    })
    @Transform(({ value }) => value.toString())
    readonly _id: Types.ObjectId;

    @ApiProperty({
        example: new Date().toISOString(),
        description: 'Date',
        format: 'date-time',
    })
    @Prop({
        type: SchemaTypes.Date,
        required: true,
    })
    readonly date: string;

    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Id',
        format: 'uuid',
        type: 'string',
    })
    @Prop({
        type: SchemaTypes.UUID,
        required: true,
    })
    readonly user: string;

    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Id',
        format: 'uuid',
        type: 'string',
    })
    @Prop({
        type: SchemaTypes.UUID,
        required: true,
    })
    readonly doctor: string;

    @ApiProperty({
        example: true,
        description: 'Active or not',
    })
    @Prop({ type: Boolean, required: true })
    readonly active: boolean;
}

export type AppointmentDocument = HydratedDocument<Appointment>;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
