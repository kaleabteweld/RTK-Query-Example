import { PrismaClient, Bank, AccountType } from "@prisma/client";
import { MakeValidator } from "../../Util/Factories";
import { newBankSchema } from "./validation";
import { IBankInput } from "./type";
import { validationDecorator } from "../../Util/fun";



export default class BankController {

    // singleton instance
    static instance: BankController;

    private prisma = new PrismaClient();

    constructor() {
        if (BankController.instance) {
            return BankController.instance;
        }

        BankController.instance = this;
    }

    // @validationDecorator<Bank>(newBankSchema)
    public async createBank(bank: Bank): Promise<Bank> {
        const cleanBank = await MakeValidator<IBankInput>(newBankSchema, bank);
        return await this.prisma.bank.create({
            data: cleanBank,
        });
    }

    public async getBanks(skip?: number, take?: number): Promise<Bank[]> {
        return await this.prisma.bank.findMany({
            skip,
            take,
        });
    }

    public async getBank(id: number): Promise<Bank> {
        return await this.prisma.bank.findUniqueOrThrow({
            where: {
                id,
            },
        });
    }

    public async updateBank(id: number, bank: Bank): Promise<Bank> {
        const cleanBank = await MakeValidator<IBankInput>(newBankSchema, bank);
        return await this.prisma.bank.update({
            where: {
                id,
            },
            data: cleanBank,
        });
    }

    public async deleteBank(id: number): Promise<Bank> {
        return await this.prisma.bank.delete({
            where: {
                id,
            },
        });
    }

}