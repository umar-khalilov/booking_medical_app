import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { BaseDto } from '@/models/base/base.dto';
import { Specializes } from '@/common/enums/specializes.enum';

export class CreateDoctorDto extends BaseDto {
    @ApiProperty({
        example: Specializes.THERAPIST,
        enum: Specializes,
        description: 'List of specializes',
    })
    @IsEnum(Specializes, { message: 'spec must be an enum value' })
    @IsNotEmpty({ message: 'spec cannot be an empty value' })
    readonly spec: Specializes;
}
