import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { BaseSchema } from '../base/base.schema';
import { Appointment } from '../appointments/appointment.schema';

@Schema({
    versionKey: false,
})
export class User extends BaseSchema {
    @Prop({
        type: [{ type: Types.ObjectId, ref: Appointment.name }],
    })
    @Type(() => Appointment)
    readonly appointments: Appointment[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
