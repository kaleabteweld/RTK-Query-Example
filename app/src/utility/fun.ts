import { AccountType } from "../types";


export function AccountTypeArray(): string[] {
    return Object.values(AccountType).filter((value) => typeof value === "string") as string[];
} 