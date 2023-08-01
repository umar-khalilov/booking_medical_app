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
import { RoleTypes } from '@/common/enums/role-types.enum';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
    public constructor(
        @InjectModel(Doctor.name)
        private readonly doctorModel: Model<DoctorDocument>,
        private readonly jwtService: JwtService,
    ) {}

    public async createOne(data: CreateDoctorDto): Promise<DoctorDto> {
        const type = RoleTypes.DOCTOR;
        const payload = { email: data.email, type };
        const regToken = await this.jwtService.signAsync(payload);
        const createdDoctor = new this.doctorModel({
            ...data,
            type,
            regToken,
        });
        if (!createdDoctor) {
            throw new ConflictException(
                `Doctor with that email: ${data.email} already exist`,
            );
        }
        const doctorInstance = await createdDoctor.save();
        return new DoctorDto(doctorInstance);
    }

    public async fetchAll(): Promise<Array<DoctorDto>> {
        const doctors = await this.doctorModel.find();
        if (!doctors.length) {
            throw new NotFoundException('Not found doctors in database');
        }
        return doctors.map(doctor => new DoctorDto(doctor));
    }

    public async findOne(id: string): Promise<DoctorDocument> {
        const doctor = await this.doctorModel.findById(id);
        if (!doctor) {
            throw new NotFoundException(`Doctor with that id: ${id} not found`);
        }
        // return new DoctorDto(doctor);
        return doctor;
    }

    async findNativeDoctor(id: string): Promise<DoctorDocument> {
        const doctor = await this.doctorModel.findById(id);
        if (!doctor) {
            throw new NotFoundException(`Doctor with that id: ${id} not found`);
        }
        return doctor;
    }

    public async updateOne(
        id: string,
        data: UpdateDoctorDto,
    ): Promise<DoctorDto> {
        const doctor = await this.doctorModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!doctor) {
            throw new NotFoundException(`Doctor with that id: ${id} not found`);
        }
        return new DoctorDto(doctor);
    }

    public async removeOne(id: string): Promise<void> {
        const removedDoctor = await this.doctorModel.deleteOne({ id });
        if (removedDoctor.deletedCount === 0) {
            throw new NotFoundException(`Doctor with that id: ${id} not found`);
        }
    }
}
