import React, { useEffect } from "react";
import { useRouter } from "next/router";
import toastMessages from "@/utils/toastMessages";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user") || "{}").auth_token;
    if (!auth) {
      toastMessages({
        type: "error",
        message: "You are not logged in",
      });
      router.replace("/access/?type=login");
    }
  }, []);
  return <>{children}</>;
}

export default AuthProvider;
