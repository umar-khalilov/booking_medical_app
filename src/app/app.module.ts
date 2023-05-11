import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { MailModule } from '@/common/mail/mail.module';
import { UserModule } from '../models/users/user.module';
import { DoctorModule } from '../models/doctors/doctor.module';
import { AppointmentModule } from '../models/appointments/appointment.module';
import { validateEnv } from './validateEnv';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: '.env',
            validate: validateEnv,
        }),
        DatabaseModule,
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (
                config: ConfigService,
            ): Promise<JwtModuleOptions> => ({
                secret: config.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: config.get<string>(
                        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
                    ),
                    algorithm: 'HS384',
                },
            }),
        }),
        MailModule,
        ScheduleModule.forRoot(),
        UserModule,
        DoctorModule,
        AppointmentModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
