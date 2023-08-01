import {
    ClassSerializerInterceptor,
    PlainLiteralObject,
    Type,
} from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { Document } from 'mongoose';

export const MongooseClassSerializerInterceptor = (
    classToIntercept: Type,
): typeof ClassSerializerInterceptor => {
    return class Interceptor extends ClassSerializerInterceptor {
        private changePlainObjectToClass(
            document: PlainLiteralObject,
        ): PlainLiteralObject {
            if (!(document instanceof Document)) {
                return document;
            }
            return plainToInstance(classToIntercept, document.toJSON());
        }

        private prepareResponse(
            response: PlainLiteralObject | PlainLiteralObject[],
        ): PlainLiteralObject | PlainLiteralObject[] {
            if (Array.isArray(response)) {
                return response.map<PlainLiteralObject>(
                    this.changePlainObjectToClass,
                );
            }
            return this.changePlainObjectToClass(response);
        }

        serialize(
            response: PlainLiteralObject | PlainLiteralObject[],
            options: ClassTransformOptions,
        ): PlainLiteralObject | PlainLiteralObject[] {
            return super.serialize(this.prepareResponse(response), options);
        }
    };
};
