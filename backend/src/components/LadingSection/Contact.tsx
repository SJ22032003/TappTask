import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

function Contact() {
  return (
    <div className={styles.mainContactContainer}>
      <section className={styles.homeDescription}>
        <h1>Still Wondering...</h1>
        <p>
          Have a question or concern? Contact us today! Our friendly and
          knowledgeable team is here to help you with anything you need. Whether
          you&apos;re a new user or a long-time customer, we&apos;re always
          happy to hear from you. Simply fill out the form on our Contact page
          and we&apos;ll get back to you as soon as possible. Don&apos;t
          hesitate to reach out – we&apos;re here to help!
        </p>
        <Link href="access/?type=register">
          <button className={styles.contactBtn}>Register Now</button>
        </Link>
      </section>
    </div>
  );
}

export default Contact;
