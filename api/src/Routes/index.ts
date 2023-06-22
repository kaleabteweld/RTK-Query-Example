import express from "express";
import { bankRouter } from "../Domains/Bank";

const appRouter = express.Router();
appRouter.use("/bank", bankRouter);


export default appRouter;