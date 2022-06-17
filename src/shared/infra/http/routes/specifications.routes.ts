import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middleware/ensureAdmin";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post(
  "/", 
  ensureAuthenticated, 
  ensureAdmin, 
  createSpecificationController.handle
);

export { specificationsRoutes };