import React from "react";
import styles from "@/styles/Layout.module.scss";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div id="main_header" className={styles.mainHeader}>
      <div className={styles.headerContainer}>
        <section className={styles.logoSection}>
          <h1>TappTask</h1>
        </section>
        <section className={styles.navigationSection}>
          <nav>
            <ul>{navigationOption()}</ul>
          </nav>
        </section>
      </div>
    </div>
  );
}

export default Header;

const navigationOption = () => {
  const options = [
    {
      name: "Home",
      link: "home",
    },
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact",
      link: "contact",
    },
    {
      name: "Login",
      route: "/access/?type=login",
    },
  ];

  return options.map((option, index) => {
    if (option.route) {
      return (
        <li key={index}>
          <Link href={option.route}>{option.name}</Link>
        </li>
      );
    }
    return (
      <li key={index}>
        <a href={`#${option.link}`}>{option.name}</a>
      </li>
    );
  });
};
