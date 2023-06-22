export interface IBank {
    id: number;
    name: string;
    number: number;

    accountType: AccountType

    startingBalance: number
    minBalanceWarning: number

    Date: Date

    country: String
    currency: String
}

export enum AccountType {
    Checking,
    Savings,
    Credit,
}

export interface IBankCreate {
    name: string;
    number: number;

    accountType: AccountType

    startingBalance: number
    minBalanceWarning: number

    Date: Date

    country: String
    currency: String
}

export interface IBankUpdate {
    name: string;
    number: number;

    accountType: AccountType

    startingBalance: number
    minBalanceWarning: number

    Date: Date

    country: String
    currency: String
}