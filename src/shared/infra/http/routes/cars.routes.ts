import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationsController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImageController";



const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationsController();
const uploadCarImage = multer(uploadConfig);
const uploadCarImagesController = new UploadCarImagesController()
carsRoutes.post(
  "/", 
  ensureAuthenticated, 
  ensureAdmin, createCarController.handle 
);

carsRoutes.get("/available", listAvailableCarsController.handle );

carsRoutes.post(
  "/specifications/:id", 
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array("images"),
  uploadCarImagesController.handle
);


export { carsRoutes }