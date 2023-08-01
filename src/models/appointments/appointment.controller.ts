import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
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
import { ConfirmationDto } from './dto/confirmation.dto';
import { RejectionDto } from './dto/rejection.dto';

@ApiTags('Appointments')
@Controller('/appointments')
export class AppointmentController {
    public constructor(
        private readonly appointmentService: AppointmentService,
    ) {}

    @ApiOperation({ summary: 'Create an appointment' })
    @ApiBadRequestResponse({ description: 'Invalid data' })
    @ApiNotFoundResponse({
        description: 'Doctor or user with that id not found',
    })
    @HttpCode(HttpStatus.CREATED)
    @Post('/')
    public async create(
        @Body() data: CreateAppointmentDto,
    ): Promise<AppointmentDto> {
        return this.appointmentService.createOne(data);
    }

    @ApiOperation({ summary: 'Get all appointments' })
    @ApiNotFoundResponse({ description: 'Not found appointments in database' })
    @Get('/')
    public async fetchAll(): Promise<AppointmentDto[]> {
        return this.appointmentService.fetchAll();
    }

    @ApiOperation({ summary: 'Confirm an appointment' })
    @ApiNotFoundResponse({
        description: 'Doctor, User or Appointment with that id not found',
    })
    @Get('/confirmation')
    public async confirmAppointment(
        @Query() confirmationDto: ConfirmationDto,
    ): Promise<void> {
        await this.appointmentService.confirmAppointment(confirmationDto);
    }

    @ApiOperation({ summary: 'Reject an appointment' })
    @ApiNotFoundResponse({
        description: 'Appointment with that id not found',
    })
    @Get('/rejection')
    public async rejectAppointment(
        @Query() appointment: RejectionDto,
    ): Promise<void> {
        await this.appointmentService.rejectAppointment(appointment);
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
    public async fetchOne(
        @Param('id')
        id: string,
    ): Promise<AppointmentDto> {
        return this.appointmentService.findOne(id);
    }
}
