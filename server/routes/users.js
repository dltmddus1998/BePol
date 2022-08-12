import express from "express";
import * as userController from "../controllers/users/users.js";

const router = express.Router();

router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.post("/signup", userController.signup);

export default router;
