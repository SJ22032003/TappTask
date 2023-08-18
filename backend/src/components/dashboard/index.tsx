import React from "react";
import Home from "./Home"

function Dashboard({ to }: { to: string }) {
  switch (to) {
    case "home":
      return <Home /> 
    default:
      break;
  }
  return (<></>);
}

export default Dashboard;
