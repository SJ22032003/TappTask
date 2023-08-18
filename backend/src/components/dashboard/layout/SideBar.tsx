import React from "react";
import closeImg from "@/assets/close.svg";
import styles from "./styles.module.scss";
import Image from "next/image";
import logout from "@/utils/logout";
import { useRouter } from "next/router";

function SideBar({ open, setOpen }: { open: boolean; setOpen: Function }) {
  let stylesSideBar = `${styles.sideBar} ${styles.close}`;
  const close = () => {
    setOpen(false);
  };
  if (open) {
    stylesSideBar = `${styles.sideBar} ${styles.open}`;
  }
  const router = useRouter();
  const handleLogout = () => {
    logout(() => router.replace("/access/?type=login"));
  };
  return (
    <aside className={stylesSideBar}>
      <div className={styles.closeBtnContainer} onClick={close}>
        <button>
          <Image src={closeImg} alt="close" />
        </button>
      </div>
      <div className={styles.actionContainer}>
        <ul>
          <li>Home</li>
          <li>Priority</li>
          <li>Unique</li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </aside>
  );
}

export default SideBar;
