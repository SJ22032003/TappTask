import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import aboutHeroImg from "@/assets/about_hero.svg";

function About() {
  return (
    <div className={styles.mainAboutContainer}>
      <section className={styles.aboutHeroImg}>
        <Image src={aboutHeroImg} alt="Hero" />
      </section>
      <section className={styles.aboutDescription}>
        <h1>Want to know more?</h1>
        <AboutPoints />
      </section>
    </div>
  );
}

export default About;

const AboutPoints = () => {
  const points = [
    "TappTask is a smart task manager webapp with login and signup functionality.",
    "It allows users to easily manage their tasks and stay organized.",
    "TappTask is perfect for busy professionals, students, and anyone who wants to stay on top of their to-do list.",
    "The webapp is secure and user-friendly, with a clean and modern design.",
    "Try TappTask today and take control of your tasks!",
  ];
  return (
    <ul className={styles.aboutPointsContainer}>
      {points.map((point, index) => {
        return <li key={index}>{point}</li>;
      })}
    </ul>
  );
};
