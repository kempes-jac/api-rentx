import { Router } from "express";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";


const passwordRoutes = Router();


const sendForgotPasswordMailController = new SendForgotPasswordMailController();
passwordRoutes.post(
  "/forgot",
  sendForgotPasswordMailController.handle
);

const resetPasswordController = new ResetPasswordController();
passwordRoutes.post(
  "/reset",
  resetPasswordController.handle
);

export { passwordRoutes }