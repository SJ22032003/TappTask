import axios from "axios";
import toastMessages from "@/utils/toastMessages";
import API from "./api";

const URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export const createNewUserAction = async (payload: TUserCreateAction) => {
  const { user, setUserDetails, navigate } = payload;
  try {
    const resp = await axios.post(`${URL}/public/register`, user);

    const { auth_token, email, username, status, message } = resp.data;
    if (status === "error") {
      throw message;
    }

    document.cookie = `auth_token=${auth_token}; max-age=7200`;

    setUserDetails({ email, username });
    navigate("/dashboard/home");
    toastMessages({ type: "success", message: "User created successfully" });

    return resp.data;
  } catch (error) {
    console.log(error);
    toastMessages({
      type: "error",
      message: "User with this email or username might already exists",
    });
  }
};

export const getUserTodosAction = async (auth: string | null) => {
  try {
    let config:any = {};
    if (auth) {
      config = {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    };
    const resp = await API.get(`/user/todos`, config);
    if (resp.data.status === "error") {
      throw resp.data.message;
    }
    return resp.data.data;
  } catch (error) {
    console.log(error);
    toastMessages({ type: "error", message: "Something went wrong" });
  }
};

export const createUserTodoAction = async (payload: TUserTodoCreateAction) => {
  const { setTodos, setModal } = payload;
  try {
    const resp = await API.post(`/user/todos`, payload);
    if (resp.data.status === "error") {
      throw resp.data.message;
    }
    const setNewTodos = await getUserTodosAction(null);
    setTodos(setNewTodos);
    setModal(false);
    toastMessages({ type: "success", message: "Todo created successfully" });
    return resp.data.data;
  } catch (error) {
    console.log(error);
    toastMessages({ type: "error", message: String(error) });
  }
};

type TUserCreateAction = {
  user: {
    email: string;
    username: string;
    password: string;
  };
  setUserDetails: Function;
  navigate: Function;
};

type TUserTodoCreateAction = {
  title: string;
  description: string;
  star: boolean;
  priority: "low" | "medium" | "high";
  completed: boolean;
  setTodos: Function;
  setModal: Function;
};
