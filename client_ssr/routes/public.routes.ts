import express from "express";
import { login } from "../controllers/login.controller";
import { register } from "../controllers/register.controller";

const publicRouter = express.Router();

/**
 * @baseURL /api/v1/public
 * @desc public routes
 * @access public
 */

publicRouter.route("/login").post(login);
publicRouter.route("/register").post(register);

export default publicRouter;
