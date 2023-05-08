import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
    @Prop({ type: String, required: true, unique: true })
    readonly email: string;

    @Prop({ type: String, required: true, name: 'reg_token' })
    readonly regToken: string;

    @Prop({ type: String, required: false, name: 'photo_avatar' })
    readonly photo_avatar: string;

    @Prop({ type: String, required: true })
    readonly phone: string;

    @Prop({ type: String, required: true })
    readonly name: string;

    @Prop()
    readonly type: 'user';
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
