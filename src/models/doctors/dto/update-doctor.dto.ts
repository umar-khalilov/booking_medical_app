import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
    @ApiProperty({
        example: true,
        description: 'The doctor is free or not',
    })
    @IsBoolean({ message: 'free must be a boolean value' })
    @IsNotEmpty({ message: 'free cannot be an empty value' })
    readonly free: boolean;
}
