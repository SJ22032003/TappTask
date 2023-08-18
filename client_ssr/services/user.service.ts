import User from "../models/user.model";

export const getUserDataService = async ({ conditions, attributes }: TProps) => {
  try {
    const response = await User.findOne(conditions, attributes);
    if(!response) {
      throw new Error('User not found');
    }
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const createNewUserService = async (createFrom: TCreateUser) => {
  try {
    const response = await User.create(createFrom);
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};


type TCreateUser = {
  email: string;
  username: string;
  password: string;
};

type TProps = {
  conditions: {};
  attributes: {};
};