import tryCatch from "../utils/try_catch.util";
import generateToken from "../utils/generate_token.util";
import { IRequestWithRole, IStatusResponse } from "@/types/network.type";
import { createNewUserService } from "../services/user.service";
import { doesKeysExistInBody, hashPassword } from "../utils/common.util";

/**
 * @desc register new user based on email, password and username
 * @route POST /api/v1/public/register
 * @access public
 */
const register = tryCatch(
  async (req: IRequestWithRole, res: IStatusResponse) => {
    const requiredFields = ["email", "password", "username"];
    if (!doesKeysExistInBody(requiredFields, req.body)) {
      res.statusCode = 400;
      throw new Error("Missing required fields");
    }

    const result = await createNewUserService({...req.body, password: hashPassword(req.body.password)});
    const token = generateToken({ id: result._id, role: result.role });

    return res
      .status(201)
      .json({
        status: "success",
        message: "User created. Welcome!",
        auth_token: token,
        email: result.email,
        username: result.username,
      });
  }
);

export { register };
