import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariables } from './EnvironmentVariables';

export const validateEnv = (
    config: Record<string, unknown>,
): EnvironmentVariables => {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        const rawErrors = errors.toString();
        throw new Error(rawErrors);
    }
    return validatedConfig;
};
