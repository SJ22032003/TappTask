import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.scss";
import Meta from "./Meta";
import { useEffect } from "react";
import { useStore } from "@/context";

function LandingLayout({ children }: THomeLayout) {
  useEffect(() => {
    setLayoutDimension();
    window.addEventListener("resize", setLayoutDimension);
    return () => window.removeEventListener("resize", setLayoutDimension);
  }, []);

  const { metaTitle } = useStore();

  return (
    <>
      <Meta metaTitle={metaTitle} />
      <Header />
      <main id="main_entry" className={styles.mainEntry}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default LandingLayout;

const setLayoutDimension = () => {
  const header = document.getElementById("main_header");
  const footer = document.getElementById("main_footer");
  const main = document.getElementById("main_entry");
  if (header && footer) {
    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    if (main) {
      main.style.minHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;
    }
  }
};

type THomeLayout = {
  children: React.ReactNode;
};
