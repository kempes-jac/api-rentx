import express, { NextFunction, Request, Response }  from "express";
import "dotenv/config";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";


import { router } from "@shared/infra/http/routes";
import swaggerFile from "./swagger.json";
import '@shared/container';
import { AppError } from "@shared/errors/AppErrors";
import upload from "@config/upload";
import rateLimiter from "@shared/infra/http/middleware/rateLimiter";

const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar",express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars",express.static(`${upload.tmpFolder}/cars`));
app.use(router);
app.use( (
  error: Error, 
  request: Request,
  response: Response, 
  next: NextFunction
  )=>{
    if(error instanceof AppError){
      return response.status(error.statusCode).json({message: error.message});
    }
    return response.status(500).send({
      status: "Error",
      message: `Internal server error - ${error.message}`
    });
  }
); 

export{ app }