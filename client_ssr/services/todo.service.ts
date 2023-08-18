import Todo from "../models/todo.model";

export const getTodosDetailsService = async ({ conditions, attributes }: TProps) => {
  try {
    const response = await Todo.find(conditions, attributes).sort({ createdAt: -1 });
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const createTodoService = async (createFrom: TCreateFrom) => {
  try {
    const response = await Todo.create(createFrom);
    if(!response){
      throw new Error("Todo not created");
    }
  } catch (error) {
    throw new Error(String(error))
  }
}

type TProps = {
  conditions: {};
  attributes: {};
};

type TCreateFrom = {
  title: string;
  description: string;
  star?: boolean;
  completed?: boolean;
  priority?: "low" | "medium" | "high";
  user_id: string;
}