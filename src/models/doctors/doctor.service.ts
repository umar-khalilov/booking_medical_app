import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorDto } from './dto/doctor.dto';
import { Roles } from '@/common/enums/roles.enum';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

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
        return doctors.map(doctor => new DoctorDto(doctor));
    }

    async findOne(id: string): Promise<DoctorDto> {
        const doctor = await this.doctorModel.findById(id);
        if (!doctor) {
            throw new NotFoundException(`Doctor with that id: ${id} not found`);
        }
        return new DoctorDto(doctor);
    }

    async findNativeDoctor(id: string): Promise<DoctorDocument> {
        const doctor = await this.doctorModel.findById(id);
        if (!doctor) {
            throw new NotFoundException(`Doctor with that id: ${id} not found`);
        }
        return doctor;
    }

    async updateOne(id: string, data: UpdateDoctorDto): Promise<DoctorDto> {
        const doctor = await this.doctorModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!doctor) {
            throw new NotFoundException(`Doctor with that id: ${id} not found`);
        }
        return new DoctorDto(doctor);
    }

    async removeOne(id: string): Promise<void> {
        const removedDoctor = await this.doctorModel.findByIdAndDelete(id);
        if (!removedDoctor) {
            throw new NotFoundException(`Doctor with that id: ${id} not found`);
        }
    }
}
