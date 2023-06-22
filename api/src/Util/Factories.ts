import express from "express";
import appRouter from "../Routes";
import helmet from "helmet";
import cors from "cors";
import { errorMiddleWare } from "./middlewares";

import Joi from "joi";
import { ErrorRes, ValidationError } from "../Types/error";


export function makeServer() {
    const app = express();

    app.use(cors())

    app.use(helmet())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));

    app.use((req, _, next) => {
        console.log("[->] ", req.method, req.url);
        next();
    })

    app.use(appRouter);
    app.use(errorMiddleWare);

    return app;
}

export async function MakeValidator<T>(validator: Joi.ObjectSchema<T>, obj: T, optional?: Joi.ValidationOptions) {
    const validationError: any = await validator.validate(obj, optional);
    if (validationError.error != null) {

        const _error = ValidationErrorFactory({
            msg: validationError.error?.message,
            statusCode: 418,
            type: "validation",
        }, cleanAttr(validationError.error?.message))
        throw _error;
    } else {
        return validationError.value;
    }
}

export function cleanAttr(errorMsg: string): string {
    var attr: string = errorMsg.split(" ")[0];
    attr = attr.replace('\"', "");
    attr = attr.replace('\"', "");
    return attr;
}

export function ValidationErrorFactory(error: ErrorRes, attr: string): ValidationError {

    return <ValidationError>{
        ...error,
        attr
    }
}