import Store from "@/context";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <>
      <Store>
        <ToastContainer position="top-right" autoClose={1200} />
        <Component {...pageProps} />
      </Store>
    </>
  );
}
