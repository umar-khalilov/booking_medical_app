import { SchemaOptions } from 'mongoose';
import { TypeMetadataStorage } from '@nestjs/mongoose/dist/storages/type-metadata.storage';
import * as _ from 'lodash';

export type CustomSchemaOptions = SchemaOptions & {
    inheritOptions?: boolean;
};

const mergeOptions = (
    parentOptions: CustomSchemaOptions,
    childOptions: CustomSchemaOptions,
): CustomSchemaOptions => {
    for (const key in childOptions) {
        if (Object.prototype.hasOwnProperty.call(childOptions, key)) {
            parentOptions[key] = childOptions[key];
        }
    }
    return parentOptions;
};

export const Schema = (options?: CustomSchemaOptions): ClassDecorator => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (target: Function) => {
        const isInheritOptions = options.inheritOptions;

        if (isInheritOptions) {
            let parentOptions = TypeMetadataStorage.getSchemaMetadataByTarget(
                (target as any).__proto__,
            ).options;
            parentOptions = _.cloneDeep(parentOptions);
            options = mergeOptions(parentOptions, options);
        }

        TypeMetadataStorage.addSchemaMetadata({
            target,
            options,
        });
    };
};
