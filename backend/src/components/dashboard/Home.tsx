import React, { useState } from "react";
import Modal from "@/components/common/Modal";
import styles from "./styles.module.scss";
import { useStore } from "@/context";
import { useForm } from "react-hook-form";
import { createUserTodoAction } from "@/network/actions";

function Home() {
  const { todos, setTodos } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={styles.homeWrapper} id="home-wrapper">
        <section className={styles.homeTopSection}>
          <button className={styles.createBtn} onClick={() => setOpen(true)}>
            Create new Todo
          </button>
        </section>
        <section className={styles.homeTodoSection}>
          {
            todos.map((todo: TTodoCard, index: number) => {
              return <TodoCard todo={todo} key={index} />
            })
          }
        </section>
      </div>
      <Modal modal={open} setModal={setOpen}>
        <CreateTodoForm setTodos={setTodos} setModal={setOpen} />
      </Modal>
    </>
  );
}

export default Home;

const CreateTodoForm = ({ setTodos, setModal }: { setTodos: Function, setModal: Function }) => {
  const form = useForm<TCreateTodoForm>();
  const { errors } = form.formState;

  const onSubmit = async (data: TCreateTodoForm) => {
    await createUserTodoAction({...data, setTodos, setModal});
  };

  return (
    <>
      <section>
        <div className={styles.homeCreateTodo}>
          <h1>Create your Task!</h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={styles.homeFormContainer}
          >
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                {...form.register("title", {
                  required: "Title is required",
                })}
              />
              <p className={styles.error}>{errors.title?.message}</p>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows={5}
                cols={40}
                {...form.register("description", {
                  required: "Description is required",
                })}
              />
              <p className={styles.error}>{errors.description?.message}</p>
            </div>
            <div className={styles.checkboxContainer}>
              <label htmlFor="star">Star</label>
              <input
                type="checkbox"
                defaultChecked={false}
                id="star"
                {...form.register("star")}
              />
              <p className={styles.error}>{errors.star?.message}</p>
            </div>
            <div className={styles.selectTabContainer}>
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                {...form.register("priority", {
                  required: "Priority is required",
                })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">high</option>
              </select>
              <p className={styles.error}>{errors.priority?.message}</p>
            </div>
            <div className={styles.checkboxContainer}>
              <label htmlFor="completed">Completed</label>
              <input
                type="checkbox"
                id="completed"
                {...form.register("completed")}
              />
              <p className={styles.error}>{errors.completed?.message}</p>
            </div>
            <div className={styles.btn}>
              <button className={styles.createBtn} type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

const TodoCard = ({ todo }: { todo: TTodoCard }) => {
  return (
    <>
      <div className={styles.todoCard}>
          <div className={styles.mainInfo}>
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
          </div>
          <div className={styles.todoCardBottom}>
            <div>
              <p>{todo.star ? "Starred" : "Not Starred"}</p>
              <p>{priorityEmoji[todo.priority]}</p>
            </div>
            <div>
              <p>{(new Date(todo.createdAt)).toLocaleDateString()}</p>
            </div>
          </div>
      </div>
    </>
  )
};

const priorityEmoji = {
  low: "🟢",
  medium: "🟡",
  high: "🔴",
}


type TCreateTodoForm = {
  title: string;
  description: string;
  star: boolean;
  priority: "low" | "medium" | "high";
  completed: boolean;
};

type TTodoCard = {
  title: string;
  description: string;
  star: boolean;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
