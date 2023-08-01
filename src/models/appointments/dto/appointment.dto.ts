import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Appointment } from '../appointment.schema';

export class AppointmentDto {
    @ApiProperty({
        example: '645b9a596e6a640b2cd325b4',
        description: 'Primary key',
        type: 'string',
        format: 'ObjectId',
        readOnly: true,
    })
    public readonly id: Types.ObjectId;

    @ApiProperty({
        example: new Date().toISOString(),
        description: 'Date',
        format: 'date-time',
    })
    public readonly date: string;

    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Id',
        format: 'uuid',
        type: 'string',
    })
    public readonly userId: string;

    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Id',
        format: 'uuid',
        type: 'string',
    })
    public readonly doctorId: string;

    @ApiProperty({
        example: true,
        description: 'Is active or not',
    })
    public readonly isActive: boolean;

    constructor(schema: Appointment) {
        this.id = schema._id;
        this.date = schema.date;
        this.userId = schema.userId;
        this.doctorId = schema.doctorId;
        this.isActive = schema.isActive;
    }
}
