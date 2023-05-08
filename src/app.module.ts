import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './app/validateEnv';
import { DatabaseModule } from './app/database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: '.env',
            validate: validateEnv,
        }),
        DatabaseModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
