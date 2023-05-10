import { randomUUID } from 'crypto';
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
    @Prop({
        type: SchemaTypes.UUID,
        default: randomUUID(),
        required: true,
    })
    @Transform(({ value }) => value.toString())
    readonly _id: string;

    @Prop({ type: String, required: true, unique: true })
    readonly email: string;

    @Prop({ type: String, required: true })
    readonly reg_token: string;

    @Prop({ type: String, required: false, name: 'photo_avatar' })
    readonly photo_avatar: string;

    @Prop({ type: String, required: true })
    readonly phone: string;

    @Prop({ type: String, required: true })
    readonly name: string;

    @Prop({ type: String, enum: Roles, required: true })
    readonly type: Roles;
}

const BaseSchema = SchemaFactory.createForClass(Base);
export type BaseDocument = HydratedDocument<Base>;
BaseSchema.virtual('id').get(function (this: BaseDocument) {
    return this._id;
});
export { BaseSchema };
