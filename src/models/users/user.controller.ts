import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { ParamWithIdDto } from '../base/param-with-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Create a user' })
    @ApiBadRequestResponse({ description: 'Invalid data' })
    @ApiConflictResponse({
        description: 'User with that email already exist',
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/')
    async create(@Body() data: CreateUserDto): Promise<UserDto> {
        return this.userService.createOne(data);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiNotFoundResponse({ description: 'Not found users in database' })
    @Get('/')
    async fetchAll(): Promise<UserDto[]> {
        return this.userService.fetchAll();
    }

    @ApiOperation({ summary: 'Get a user' })
    @ApiParam({
        name: 'id',
        type: 'string',
        format: 'uuid',
        required: true,
    })
    @ApiNotFoundResponse({ description: 'User with that id not found' })
    @Get('/:id')
    async fetchOne(
        @Param('id')
        id: string,
    ): Promise<UserDto> {
        return this.userService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a user' })
    @ApiNotFoundResponse({ description: 'User with that id not found' })
    @HttpCode(HttpStatus.ACCEPTED)
    @Patch('/:id')
    async updateOne(
        @Param()
        { id }: ParamWithIdDto,
        @Body() data: UpdateUserDto,
    ): Promise<UserDto> {
        return this.userService.updateOne(id, data);
    }

    @ApiOperation({ summary: 'Delete a user' })
    @ApiNotFoundResponse({ description: 'User with that id not found' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/:id')
    async removeOne(
        @Param()
        { id }: ParamWithIdDto,
    ): Promise<void> {
        await this.userService.removeOne(id);
    }
}
