import express from "express";
import { getTodoForUser, createTodoForUser } from "../controllers/todo.controller";

const userRouter = express.Router();

/** 
 * @baseURL /api/v1/user
 * @desc user routes
 * @access private
*/

userRouter.route("/todos").get(getTodoForUser).post(createTodoForUser);

export default userRouter;

