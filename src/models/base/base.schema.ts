import { randomUUID } from 'crypto';
import { Prop } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Transform } from 'class-transformer';
import { RoleTypes } from '@/common/enums/role-types.enum';

export class BaseSchema {
    @Prop({
        type: SchemaTypes.UUID,
        default: randomUUID(),
        required: true,
    })
    @Transform(({ value }) => value.toString())
    readonly _id: string;

    @Prop({ type: String, required: true, unique: true })
    readonly email: string;

    @Prop({ type: String, required: true, select: false })
    readonly regToken: string;

    @Prop({ type: String, required: false })
    readonly photoAvatar: string;

    @Prop({ type: String, required: true })
    readonly phone: string;

    @Prop({ type: String, required: true })
    readonly name: string;

    @Prop({ type: String, enum: RoleTypes, required: true })
    readonly type: RoleTypes;
}
