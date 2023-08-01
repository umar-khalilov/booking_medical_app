import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { RoleTypes } from '@/common/enums/role-types.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    public constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    public async createOne(data: CreateUserDto): Promise<UserDto> {
        const type = RoleTypes.USER;
        const payload = { email: data.email, type };
        const regToken = await this.jwtService.signAsync(payload);
        const createdUser = new this.userModel({
            ...data,
            type,
            regToken,
        });
        if (!createdUser) {
            throw new ConflictException(
                `User with that email: ${data.email} already exist`,
            );
        }
        const userInstance = await createdUser.save();
        return new UserDto(userInstance);
    }

    public async fetchAll(): Promise<Array<UserDto>> {
        const users = await this.userModel.find();
        if (!users.length) {
            throw new NotFoundException('No found users in database');
        }
        return users.map(user => new UserDto(user));
    }

    public async findOne(id: string): Promise<UserDto> {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException(`User with that id: ${id} not found`);
        }
        return new UserDto(user);
    }

    public async findNativeUser(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException(`User with that id: ${id} not found`);
        }
        return user;
    }

    public async updateOne(id: string, data: UpdateUserDto): Promise<UserDto> {
        const user = await this.userModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!user) {
            throw new NotFoundException(`User with that id: ${id} not found`);
        }
        return new UserDto(user);
    }

    public async removeOne(id: string): Promise<void> {
        const removedUser = await this.userModel.findByIdAndDelete(id);
        if (!removedUser) {
            throw new NotFoundException(`User with that id: ${id} not found`);
        }
    }
}
