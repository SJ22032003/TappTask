import React from "react";
import UserAccess from "@/components/UserAccess";
import Meta from "@/components/layout/Meta";
import { useRouter } from "next/router";
import { useStore } from "@/context";

function AccessPage() {
  const { setMetaTitle, metaTitle } = useStore();
  setMetaTitle("Login | Register to TappTask");

  const router = useRouter();
  const type = (router.query.type as string) || "login";
  const allowedAccess: { [key: string]: boolean } = {
    login: true,
    register: true,
  };

  if (!allowedAccess[type]) {
    router.push("/access/?type=register");
  }

  return (
    <>
      <Meta metaTitle={metaTitle} />
      <UserAccess userType={type} />
    </>
  );
}

export default AccessPage;
