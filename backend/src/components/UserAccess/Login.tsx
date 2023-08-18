import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Link from "next/link";

function Login() {
  const form = useForm<TLoginForm>();
  const { errors } = form.formState;

  const onSubmit = (data: TLoginForm) => {
    console.log(data);
  };

  return (
    <>
      <section className={styles.loginContainer}>
        <div className={styles.loginFormSection}>
          <h1>Login</h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...form.register("username", {
                  required: "Username is required",
                  maxLength: { value: 25, message: "Max 25 characters only" },
                })}
              />
              <p className={styles.error}>{errors.username?.message}</p>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...form.register("password", {
                  required: "Password is required",
                  minLength: { value: 5, message: "Minimum 5 letters" },
                })}
              />
              <p className={styles.error}>{errors.password?.message}</p>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className={styles.changeForm}>
          <p>Not have an account?</p>
          <Link href="access/?type=register">Register Now</Link>
        </div>
      </section>
    </>
  );
}

export default Login;

type TLoginForm = {
  username: string;
  password: string;
};
