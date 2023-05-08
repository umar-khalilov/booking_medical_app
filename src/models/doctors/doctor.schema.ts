import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Doctor {
    @Prop({ unique: true })
    readonly email: string;

    @Prop()
    readonly reg_token: string;

    @Prop()
    readonly photo_avatar: string;

    @Prop()
    readonly phone: string;

    @Prop()
    readonly name: string;

    @Prop()
    readonly type: 'doc';

    @Prop()
    readonly spec: 'therapist';

    @Prop()
    readonly free: boolean;

    @Prop()
    readonly appointments_accepted: [];
}

export type DoctorDocument = HydratedDocument<Doctor>;
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
