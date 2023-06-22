import { AccountType } from "@prisma/client";

export interface IBankInput {
    name: string;
    number: number;

    accountType: AccountType

    startingBalance: number
    minBalanceWarning: number

    Date: Date

    country: String
    currency: String
}