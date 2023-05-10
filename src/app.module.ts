import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { validateEnv } from './app/validateEnv';
import { DatabaseModule } from './app/database/database.module';
import { UserModule } from './models/users/user.module';
import { DoctorModule } from './models/doctors/doctor.module';
import { AppointmentModule } from './models/appointments/appointment.module';

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
        UserModule,
        DoctorModule,
        AppointmentModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
