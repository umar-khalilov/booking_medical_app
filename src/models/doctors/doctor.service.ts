import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { JwtService } from '@nestjs/jwt';
import { DoctorDto } from './dto/doctor.dto';
import { Roles } from '@/common/enums/roles.enum';

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel(Doctor.name)
        private readonly doctorModel: Model<DoctorDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async createOne(data: CreateDoctorDto): Promise<DoctorDto> {
        const type = Roles.DOCTOR;
        const payload = { email: data.email, type };
        const regToken = await this.jwtService.signAsync(payload);
        const createdDoctor = new this.doctorModel({
            ...data,
            type,
            reg_token: regToken,
        });
        if (!createdDoctor) {
            throw new ConflictException(
                `Doctor with that email: ${data.email} already exist`,
            );
        }
        const doctorInstance = await createdDoctor.save();
        return new DoctorDto(doctorInstance);
    }

    async fetchAll(): Promise<Array<DoctorDto>> {
        const doctors = await this.doctorModel.find();
        if (!doctors.length) {
            throw new NotFoundException('Not found doctors in database');
        }
        const normalizedDoctors = doctors.map(doctor => new DoctorDto(doctor));
        return normalizedDoctors;
    }

    async findOne(id: string): Promise<DoctorDto> {
        const doctor = await this.doctorModel.findById(id);
        if (!doctor) {
            throw new NotFoundException(`Doctor with that id: ${id} not found`);
        }
        return new DoctorDto(doctor);
    }
}
