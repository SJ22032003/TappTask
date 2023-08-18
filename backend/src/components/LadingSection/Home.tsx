import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import heroImg from "@/assets/hero.svg";

function Home() {
  return (
    <div className={styles.mainHomeContainer}>
      <section className={styles.homeDescription}>
        <h1>Your Personalized Task Manager</h1>
        <p>
          Welcome to TappTask, your personalized task manager! With TappTask,
          you can easily manage your tasks and stay organized. Our intuitive
          interface and powerful features make it easy to create, track, and
            complete tasks. Whether you&rsquo;re a busy professional or a student,
          TappTask is the perfect tool to help you stay on top of your to-do
          list.
        </p>
      </section>
      <section className={styles.homeHeroImg}>
        <Image src={heroImg} alt="Hero" />
      </section>
    </div>
  );
}

export default Home;
