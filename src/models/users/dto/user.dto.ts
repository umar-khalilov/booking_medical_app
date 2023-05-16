import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.schema';
import { Appointment } from '@/models/appointments/appointment.schema';
import { RoleTypes } from '@/common/enums/role-types.enum';

export class UserDto {
    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Primary key',
        type: 'string',
        format: 'uuid',
        readOnly: true,
    })
    public readonly id: string;

    @ApiProperty({
        example: 'Arnold Schwarzenegger',
        description: 'The name of user',
        required: true,
    })
    public readonly name: string;

    @ApiProperty({
        example: 'arnold-classic@gmail.com',
        description: 'The email of doctor',
        format: 'email',
        required: true,
    })
    public readonly email: string;

    @ApiProperty({
        example:
            'https://upload.wikimedia.org/wikipedia/commons/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg',
        description: 'The url address to photo picture',
        required: false,
    })
    public readonly photoAvatar: string;

    @ApiProperty({
        example: '+380952499948',
        description: 'The phone number',
        required: true,
    })
    public readonly phone: string;

    @ApiProperty({
        example: RoleTypes.USER,
        enum: RoleTypes,
        description: 'Role type',
    })
    public readonly type: RoleTypes;

    readonly appointments: Appointment[];

    constructor(schema: User) {
        this.id = schema._id;
        this.name = schema.name;
        this.email = schema.email;
        this.photoAvatar = schema.photoAvatar;
        this.phone = schema.phone;
        this.type = schema.type;
        this.appointments = schema.appointments;
    }
}
