import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
    async transform(value: unknown, { metatype }: { metatype?: unknown }) {
        if (!metatype || !this.toValidate(metatype as Function)) {
            return value;
        }

        const object = plainToInstance(metatype as new () => object, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new BadRequestException({
                message: 'Validation failed',
                errors: this.formatErrors(errors),
            });
        }

        return object;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private formatErrors(errors: ValidationError[]): Record<string, string[]> {
        return errors.reduce(
            (acc, error) => {
                acc[error.property] = Object.values(error.constraints ?? {});
                return acc;
            },
            {} as Record<string, string[]>,
        );
    }
}
