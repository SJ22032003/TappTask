import { IRequestWithRole, IStatusResponse } from "@/types/network.type";
import tryCatch from "../utils/try_catch.util";

/**
 * @desc login user by username and password
 * @route POST /api/v1/auth/login
 * @access public
 */
const login = tryCatch(async (req: IRequestWithRole, res: IStatusResponse) => {
  return res.status(200).json({
    status: "success",
    message: "login success",
  });
});

export { login };
