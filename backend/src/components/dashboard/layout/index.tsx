import React from "react";
import ToolBar from "./ToolBar";
import SideBar from "./SideBar";
import BackDrop from "./BackDrop";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useStore } from "@/context";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setDashboardLayoutHeight();
    // setDashboardWrapperHeight();
    window.addEventListener("resize", setDashboardLayoutHeight);
    return () => {
      window.removeEventListener("resize", setDashboardLayoutHeight);
      // window.removeEventListener("resize", setDashboardWrapperHeight);
    };
  }, []);
  const [showSideBar, setShowSideBar] = useState(false);
  const { setMetaTitle } = useStore();
  setMetaTitle("Dashboard");
  return (
    <main className={styles.wrapper} id="dashboard-wrapper">
      <ToolBar open={showSideBar} setOpen={setShowSideBar} />
      <section id="dashboard-children">{children}</section>
      <SideBar open={showSideBar} setOpen={setShowSideBar} />
      <BackDrop open={showSideBar} setOpen={setShowSideBar} />
    </main>
  );
}

export default DashboardLayout;

const setDashboardLayoutHeight = () => {
  const dashboardChildren = document.getElementById("dashboard-children");
  const toolbar = document.getElementById("toolbar");
  if (dashboardChildren && toolbar) {
    dashboardChildren.style.height = `calc(100vh - ${toolbar.offsetHeight}px)`;
  }
};

// const setDashboardWrapperHeight = () => {
//   const dashboardWrapper = document.getElementById("dashboard-wrapper");
//   const toolbar = document.getElementById("toolbar");
//   const children = document.getElementById("dashboard-children");
//   if (toolbar && children) {
//     let childrenHeight = toolbar.offsetHeight + children.offsetHeight;
//     if (dashboardWrapper) {
//       dashboardWrapper.style.height = `calc(100vh + ${childrenHeight}px)`;
//       console.log("dashboardWrapper.style.height", dashboardWrapper.style.height);
//     }
//   }
// };
