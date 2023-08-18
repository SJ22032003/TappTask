import React from "react";
import styles from "./styles.module.scss"

function BackDrop({ open, setOpen }: { open: boolean; setOpen: Function }) {
  if (!open) return null;
  const close = () => {
    setOpen(false);
  };
  return <div className={styles.backdrop} onClick={close}></div>;
}

export default BackDrop;
