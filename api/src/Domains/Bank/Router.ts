import express, { Response, Request } from "express";
import BankController from "./controller";
import { MakeErrorHandler } from "../../Util/middlewares";

const bankRouter = express.Router();
const bankController = new BankController();

bankRouter.post("/new", MakeErrorHandler(
    async (req: Request, res: Response) => {
        const bank = await bankController.createBank(req.body);
        res.send(bank);
    }));

bankRouter.get("/all", MakeErrorHandler(
    async (req: Request, res: Response) => {
        const skip = req.query.skip ? Number(req.query.skip) : undefined;
        const take = req.query.take ? Number(req.query.take) : undefined;

        const banks = await bankController.getBanks(skip, take);
        res.send(banks);
    }));

bankRouter.get("/:id", MakeErrorHandler(
    async (req: Request, res: Response) => {
        const bank = await bankController.getBank(Number(req.params.id));
        res.send(bank);
    }));

bankRouter.put("/:id", MakeErrorHandler(
    async (req: Request, res: Response) => {
        const bank = await bankController.updateBank(Number(req.params.id), req.body);
        res.send(bank);
    }));

bankRouter.delete("/:id", MakeErrorHandler(
    async (req: Request, res: Response) => {
        const bank = await bankController.deleteBank(Number(req.params.id));
        res.send(bank);
    }));



export default bankRouter