import React from "react";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import styles from "./styles.module.scss";

function index() {
  return (
    <div className={styles.mainLadingSection}>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default index;
