import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import "dotenv/config";

import upload from "@config/upload";

import createConnection from "../../../database";
import "@shared/container";

// eslint-disable-next-line import-helpers/order-imports, import/order
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();
const app = express();
app.use(express.json());

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",

      message: `Internal server error - ${err.message}`,
    });
  }
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export { app };
