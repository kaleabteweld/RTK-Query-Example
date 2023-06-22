import Joi from "joi";
import { MakeValidator } from "./Factories";

// validation decorator
export function validationDecorator<T>(validator: Joi.ObjectSchema<T>, optional?: Joi.ValidationOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const cleanArgs = await MakeValidator<T>(validator, args[0], optional);
            return originalMethod.apply(this, [cleanArgs]);
        };

        return descriptor;
    };
}