import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ConfirmationDto {
    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Primary key',
        format: 'uuid',
        type: 'string',
    })
    @IsUUID('4', { message: 'doctorId must be a valid uuid value' })
    @IsString({ message: 'doctorId must be a string value' })
    @IsNotEmpty({ message: 'doctorId cannot be an empty value' })
    readonly doctorId: string;

    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Primary key',
        format: 'uuid',
        type: 'string',
    })
    @IsUUID('4', { message: 'userId must be a valid uuid value' })
    @IsString({ message: 'userId must be a string value' })
    @IsNotEmpty({ message: 'userId cannot be an empty value' })
    readonly userId: string;

    @ApiProperty({
        example: '645b9a596e6a640b2cd325b4',
        description: 'Primary key',
        type: 'string',
        format: 'ObjectId',
    })
    @IsMongoId({ message: 'appointmentId must be a valid mongo id value' })
    @IsString({ message: 'appointmentId must be a string value' })
    @IsNotEmpty({ message: 'appointmentId cannot be an empty value' })
    readonly appointmentId: string;
}
