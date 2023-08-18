import styles from "./styles.module.scss";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createNewUserAction } from "@/network/actions";
import { useStore } from "@/context";
import { useRouter } from "next/router";

function Register() {

  const { setUserDetails  } = useStore();
  const router = useRouter();

  const form = useForm<TRegisterForm>();
  const { errors } = form.formState;

  const onSubmit = async (data: TRegisterForm) => {
    await createNewUserAction({ user: data, setUserDetails, navigate: (path: string) => router.replace(path) });
  };

  return (
    <>
      <section className={styles.loginContainer}>
        <div className={styles.loginFormSection}>
          <h1>Register</h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                {...form.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className={styles.error}>{errors.email?.message}</p>
            </div>
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
            <button type="submit">Welcome</button>
          </form>
        </div>
        <div className={styles.changeForm}>
          <p>Already have an account?</p>
          <Link href="access/?type=login">Login now</Link>
        </div>
      </section>
    </>
  );
}

export default Register;

type TRegisterForm = {
  email: string;
  username: string;
  password: string;
};
