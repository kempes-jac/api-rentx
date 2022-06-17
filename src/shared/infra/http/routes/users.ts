import { Router } from "express";
import multer from "multer";


import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "@modules/cars/useCases/profileUser/ProfileUserController";


const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserUseCase = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController()


usersRoutes.post("/", createUserUseCase.handle);
usersRoutes.patch(
  "/avatar", 
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle 
);
usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes }