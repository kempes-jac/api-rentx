import "reflect-metadata";
import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoriesController } from '@modules/cars/useCases/importCategories/ImportCategoriesController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ensureAdmin } from "../middleware/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle 
);

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle );

const imporCategoriesController = new ImportCategoriesController

categoriesRoutes.post(
  "/import", 
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"), imporCategoriesController.handle
);

export { categoriesRoutes }