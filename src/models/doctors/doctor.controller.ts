import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
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
}
