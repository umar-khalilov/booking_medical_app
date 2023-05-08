import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const username = config.get<string>('DB_USER');
                const password = config.get<string>('DB_PASSWORD');
                const database = config.get<string>('DB_NAME');
                const host = config.get<string>('DB_HOST');
                return {
                    uri: `mongodb://${username}:${password}@${host}`,
                    dbName: database,
                };
            },
        }),
    ],
})
export class DatabaseModule {}
