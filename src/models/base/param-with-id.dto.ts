import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ParamWithIdDto {
    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Id',
        type: 'string',
        format: 'uuid',
    })
    @IsUUID('4', { message: 'id must be a valid  uuid value' })
    @IsString({ message: 'id must be a string value' })
    @IsNotEmpty({ message: 'id cannot be an empty value' })
    readonly id: string;
}
