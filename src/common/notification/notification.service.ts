import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '@/models/users/user.service';
import { AppointmentService } from '@/models/appointments/appointment.service';

@Injectable()
export class NotificationService {
    private readonly logger: Logger;

    constructor(
        private readonly userService: UserService,
        private readonly appointmentService: AppointmentService,
    ) {
        this.logger = new Logger(NotificationService.name);
    }

    async sendNotificationOneDay(): Promise<void> {
        //TODO
    }
}
