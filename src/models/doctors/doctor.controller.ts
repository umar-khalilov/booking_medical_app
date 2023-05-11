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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorDto } from './dto/doctor.dto';
import { ParamWithIdDto } from '../base/param-with-id.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('Doctors')
@Controller('/doctors')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @ApiOperation({ summary: 'Create a doctor' })
    @ApiBadRequestResponse({ description: 'Invalid data' })
    @ApiConflictResponse({
        description: 'Doctor with that email already exist',
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/')
    async create(@Body() data: CreateDoctorDto): Promise<DoctorDto> {
        return this.doctorService.createOne(data);
    }

    @ApiOperation({ summary: 'Get all doctors' })
    @ApiNotFoundResponse({ description: 'Not found doctors in database' })
    @Get('/')
    async fetchAll(): Promise<DoctorDto[]> {
        return this.doctorService.fetchAll();
    }

    @ApiOperation({ summary: 'Get a doctor' })
    @ApiParam({
        name: 'id',
        type: 'string',
        format: 'uuid',
        required: true,
    })
    @ApiNotFoundResponse({ description: 'Doctor with that id not found' })
    @Get('/:id')
    async fetchOne(
        @Param('id')
        id: string,
    ): Promise<DoctorDto> {
        return this.doctorService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a doctor' })
    @ApiNotFoundResponse({ description: 'Doctor with that id not found' })
    @HttpCode(HttpStatus.ACCEPTED)
    @Patch('/:id')
    async updateOne(
        @Param()
        { id }: ParamWithIdDto,
        @Body() data: UpdateDoctorDto,
    ): Promise<DoctorDto> {
        return this.doctorService.updateOne(id, data);
    }

    @ApiOperation({ summary: 'Delete a doctor' })
    @ApiNotFoundResponse({ description: 'Doctor with that id not found' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/:id')
    async removeOne(
        @Param()
        { id }: ParamWithIdDto,
    ): Promise<void> {
        await this.doctorService.removeOne(id);
    }
}
