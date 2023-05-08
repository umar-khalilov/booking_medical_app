import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './doctor.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Doctor.name, schema: DoctorSchema },
        ]),
    ],
    providers: [],
    controllers: [],
})
export class DoctorModule {}
