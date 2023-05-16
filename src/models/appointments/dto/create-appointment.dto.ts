import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
    @ApiProperty({
        example: new Date().toISOString().slice(0, 19),
        description: 'Date appointment',
        format: 'date-time',
    })
    @IsDateString({}, { message: 'date must be a valid date value' })
    @IsNotEmpty({ message: 'date cannot be an empty value' })
    readonly date: string;

    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Primary key',
        format: 'uuid',
        type: 'string',
    })
    @IsUUID('4', { message: 'user must be an valid uuid value' })
    @IsString({ message: 'user must be a string value' })
    @IsNotEmpty({ message: 'user cannot be an empty value' })
    readonly userId: string;

    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Primary key',
        format: 'uuid',
        type: 'string',
    })
    @IsUUID('4', { message: 'doctor must be an valid uuid value' })
    @IsString({ message: 'doctor must be a string value' })
    @IsNotEmpty({ message: 'doctor cannot be an empty value' })
    readonly doctorId: string;
}
