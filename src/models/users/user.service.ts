import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async createOne(data: CreateUserDto): Promise<UserDto> {
        const payload = { email: data.email, type: data.type };
        const regToken = await this.jwtService.signAsync(payload);
        const createdUser = new this.userModel({
            ...data,
            reg_token: regToken,
        });
        if (!createdUser) {
            throw new ConflictException(
                `User with that email: ${data.email} already exist`,
            );
        }
        const userInstance = await createdUser.save();
        return new UserDto(userInstance);
    }

    async fetchAll(): Promise<Array<UserDto>> {
        const users = await this.userModel.find();
        if (!users.length) {
            throw new NotFoundException('No found users in database');
        }
        const normalizedUsers = users.map(user => new UserDto(user));
        return normalizedUsers;
    }

    async findOne(id: string): Promise<UserDto> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException(`User with that id: ${id} not found`);
        }
        return new UserDto(user);
    }
}
