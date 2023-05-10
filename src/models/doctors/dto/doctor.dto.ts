import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '../doctor.schema';
import { Appointment } from '@/models/appointments/appointment.schema';
import { Roles } from '@/common/enums/roles.enum';
import { Specializes } from '@/common/enums/specializes.enum';

export class DoctorDto {
    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Primary key',
        type: 'string',
        format: 'uuid',
        readOnly: true,
    })
    public readonly id: string;

    @ApiProperty({
        example: 'Sincere@april.biz',
        description: 'The email of doctor',
        format: 'email',
        required: true,
    })
    public readonly email: string;
    public readonly reg_token: string;

    @ApiProperty({
        example:
            'https://upload.wikimedia.org/wikipedia/commons/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg',
        description: 'The url address to photo picture',
        required: false,
    })
    public readonly photo_avatar: string;

    @ApiProperty({
        example: '+380952499948',
        description: 'The phone number',
        required: true,
    })
    public readonly phone: string;

    @ApiProperty({
        example: 'Leanne Graham',
        description: 'The name of user',
        required: true,
    })
    public readonly name: string;

    @ApiProperty({
        example: Roles.DOCTOR,
        enum: Roles,
        description: 'Role type',
    })
    public readonly type: Roles;

    @ApiProperty({
        example: Specializes.THERAPIST,
        enum: Specializes,
        description: 'List of specializes',
    })
    public readonly spec: Specializes;

    @ApiProperty({
        example: false,
        description: 'The doctor is free or not',
    })
    public readonly free: boolean;
    public readonly appointments_accepted: Appointment[];

    constructor(schema: Doctor) {
        this.id = schema._id;
        this.email = schema.email;
        this.reg_token = schema.reg_token;
        this.photo_avatar = schema.photo_avatar;
        this.phone = schema.phone;
        this.name = schema.name;
        this.type = schema.type;
        this.spec = schema.spec;
        this.free = schema.free;
        this.appointments_accepted = schema.appointments_accepted;
    }
}
