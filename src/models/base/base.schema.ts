import { randomUUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Transform } from 'class-transformer';
import { Schema } from '@/common/decorators/schema.decorator';
import { Roles } from '@/common/enums/roles.enum';

@Schema({
    toJSON: {
        virtuals: true,
    },
})
export class Base {
    @ApiProperty({
        example: '9ca4266c-be45-46dc-8aae-e57ceee8a59f',
        description: 'Primary key',
        type: 'string',
        format: 'uuid',
        readOnly: true,
    })
    @Prop({
        type: SchemaTypes.UUID,
        default: () => randomUUID(),
        required: true,
    })
    @Transform(({ value }) => value.toString())
    readonly _id: string;

    @ApiProperty({
        example: 'Sincere@april.biz',
        description: 'The email of doctor',
        format: 'email',
        required: true,
    })
    @Prop({ type: String, required: true, unique: true })
    readonly email: string;

    @Prop({ type: String, required: true })
    readonly reg_token: string;

    @ApiProperty({
        example:
            'https://upload.wikimedia.org/wikipedia/commons/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg',
        description: 'The url address to photo picture',
        required: false,
    })
    @Prop({ type: String, required: false, name: 'photo_avatar' })
    readonly photo_avatar: string;

    @ApiProperty({
        example: '+380952499948',
        description: 'The phone number',
        required: true,
    })
    @Prop({ type: String, required: true })
    readonly phone: string;

    @ApiProperty({
        example: 'Leanne Graham',
        description: 'The name of user',
        required: true,
    })
    @Prop({ type: String, required: true })
    readonly name: string;

    @ApiProperty({
        examples: [Roles],
        enum: Roles,
        description: 'Role type',
    })
    @Prop({ type: String, enum: Roles, required: true })
    readonly type: Roles;
}

const BaseSchema = SchemaFactory.createForClass(Base);
export type BaseDocument = HydratedDocument<Base>;
BaseSchema.virtual('id').get(function (this: BaseDocument) {
    return this._id;
});
export { BaseSchema };
