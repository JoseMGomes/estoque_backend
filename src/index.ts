import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import rootRouter from "./routes";
import cors from "cors"; 

const app: Express = express();

app.use(cors({
  origin: '*'
}));


app.use(express.json());

app.use("/api", rootRouter);


export const prismaClient = new PrismaClient({
  log: ["query"],
});


app.listen(3000, () => {
  console.log("App Funcionando!");
});
