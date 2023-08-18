import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import closeImg from "@/assets/close.svg";
import Image from "next/image";

export default function Modal({ modal = false, setModal, children }: TProps) {
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add(styles["active-modal"]);
    } else {
      document.body.classList.remove(styles["active-modal"]);
    }
    return () => {};
  }, [modal]);

  return (
    <>
      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles["modal-content"]}>
            {children}
            <button className={styles["close-modal"]} onClick={toggleModal}>
              <Image src={closeImg} alt="Close Modal" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

type TProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  children: React.ReactNode;
};
