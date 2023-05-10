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
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentDto } from './dto/appointment.dto';

@ApiTags('Appointments')
@Controller('/appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @ApiOperation({ summary: 'Create an appointment' })
    @ApiBadRequestResponse({ description: 'Invalid data' })
    @HttpCode(HttpStatus.CREATED)
    @Post('/')
    async create(@Body() data: CreateAppointmentDto): Promise<AppointmentDto> {
        return this.appointmentService.createOne(data);
    }

    @ApiOperation({ summary: 'Get all appointments' })
    @ApiNotFoundResponse({ description: 'Not found appointments in database' })
    @Get('/')
    async fetchAll(): Promise<AppointmentDto[]> {
        return this.appointmentService.fetchAll();
    }

    @ApiOperation({ summary: 'Get an appointment' })
    @ApiParam({
        name: 'id',
        type: 'string',
        format: 'ObjectId',
        required: true,
    })
    @ApiNotFoundResponse({ description: 'Appointment with that id not found' })
    @Get('/:id')
    async fetchOne(
        @Param('id')
        id: string,
    ): Promise<AppointmentDto> {
        return this.appointmentService.findOne(id);
    }
}
