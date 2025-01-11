import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import rootRouter from "./routes";
import { PORT } from './secrets';

const app: Express = express();

app.use(express.json())

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
    log:['query']
})

app.listen(PORT, () => {
  console.log("App Funcionando!");
});
