import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { Base } from '../base/base.schema';
import { Appointment } from '../appointments/appointment.schema';
import { Schema } from '@/common/decorators/schema.decorator';

@Schema({
    inheritOptions: true,
})
export class User extends Base {
    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Appointment' }],
    })
    @Type(() => Appointment)
    readonly appointments: Appointment[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
