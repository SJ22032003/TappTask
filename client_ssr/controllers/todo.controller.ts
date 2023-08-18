import { IRequestWithRole, IStatusResponse } from "@/types/network.type";
import { getTodosDetailsService } from "../services/todo.service";
import { doesKeysExistInBody } from "../utils/common.util";
import { createTodoService } from "../services/todo.service";
import tryCatch from "../utils/try_catch.util";

/**
 * @desc get todo for the user by id
 * @route /api/v1/user/todos
 * @access private
 */
const getTodoForUser = tryCatch(async (req: IRequestWithRole, res: IStatusResponse) => {
    const id  = req.id;
    const result =  await getTodosDetailsService({ conditions: { user_id: id }, attributes: { _id: 0 } });
    return res.status(200).json({ status: "success", data: result });
  }
);

/**
 * @desc create todo for the user by id
 * @route /api/v1/user/todos
 * @access private
*/
const createTodoForUser = tryCatch(async (req: IRequestWithRole, res: IStatusResponse) => {
  const requiredFields = ["title", "description"];
  if(!doesKeysExistInBody(requiredFields, req.body)) {
    return res.status(400).json({ status: "error", message: "required fields are missing" });
  }

  const id = req.id;

  const result = await createTodoService({ ...req.body, user_id: id });
  return res.status(201).json({ status: "success", message: "Todo created Successfully!" });

});

export { getTodoForUser, createTodoForUser };