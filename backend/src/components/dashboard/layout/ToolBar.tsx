import React from 'react'
import Image from 'next/image';
import menuImg from "@/assets/menu.svg";
import styles from "./styles.module.scss"

function ToolBar({ setOpen }: { open: boolean; setOpen: Function }){
  const handleOpening = () => {
    setOpen(true);
  };
  return (
    <section className={styles.toolBar} id="toolbar">
      <div className={styles.burger}>
        <button onClick={handleOpening}>
          <Image src={menuImg} alt="menu" />
        </button>
      </div>
      <div className={styles.title}>
        <h1>Dashboard</h1>
      </div>
    </section>
  );
};


export default ToolBar;