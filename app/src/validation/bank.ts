import Joi from "joi";
import { AccountType, IBankCreate } from "../types";
import { AccountTypeArray } from "../utility/fun";



export const newBankSchema = Joi.object<IBankCreate>({
    name: Joi.string().required(),
    number: Joi.number().required(),

    accountType: Joi.string().valid(...AccountTypeArray()).required(),

    startingBalance: Joi.number().required(),
    minBalanceWarning: Joi.number().required().custom((value, helper) => {
        if (helper.state.ancestors[0].startingBalance < value) {
            throw Error("\"minBalanceWarning\" Must Be Less Than \"startingBalance\"");
        }

        return value;
    }),

    Date: Joi.date().required(),

    country: Joi.string().required(),
    currency: Joi.string().required(),
});

export const updateBankSchema = Joi.object<IBankCreate>({
    name: newBankSchema.extract("name"),
    number: newBankSchema.extract("number"),

    accountType: newBankSchema.extract("accountType"),
    startingBalance: newBankSchema.extract("startingBalance"),
    minBalanceWarning: newBankSchema.extract("minBalanceWarning"),

    Date: newBankSchema.extract("Date"),

    country: newBankSchema.extract("country"),
    currency: newBankSchema.extract("currency"),
});