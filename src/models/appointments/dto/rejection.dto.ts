import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class RejectionDto {
    @ApiProperty({
        example: '645b9a596e6a640b2cd325b4',
        description: 'Id',
        type: 'string',
        format: 'ObjectId',
    })
    @IsMongoId({ message: 'appointmentId must be a valid mongo id value' })
    @IsString({ message: 'appointmentId must be a string value' })
    @IsNotEmpty({ message: 'appointmentId cannot be an empty value' })
    readonly appointmentId: string;
}
