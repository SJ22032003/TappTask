import React from "react";
import AuthProvider from "@/components/auth/AuthProvider";
import DashboardLayout from "@/components/dashboard/layout";
import Dashboard from "@/components/dashboard";
import { useStore } from "@/context";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType } from 'next'
import { getUserTodosAction } from "@/network/actions";
import { useEffect } from "react";

function DashboardToPage({ todos }: TProps) {
  const router = useRouter();
  const { setTodos } = useStore();
  const goTo = (router.query.to as string) || "home";
  const allowedDashboardRoutes: TAllowedRoutes = { home: "home" };
  if (!allowedDashboardRoutes[goTo]) {
    router.replace("/dashboard/home");
  }
  useEffect(() => setTodos(todos) , [todos]);
  return (
    <AuthProvider>
      <DashboardLayout>
        <Dashboard to={goTo} />
      </DashboardLayout>
    </AuthProvider>
  );
}

export default DashboardToPage;

export const getServerSideProps  = async ({ params, req }: { params: { to: string }, req: any}) => {
  const { to } = params;
  const allowedDashboardRoutes: TAllowedRoutes = { home: "home" };
  if (!allowedDashboardRoutes[to]) {
    return {
      redirect: {
        destination: '/access/?type=login',
        permanent: true,
      },
    }
  }
  const authToken = req.cookies.auth_token;
  console.log("authToken", authToken);
  const todos = await getUserTodosAction(authToken);  
  return {
    props: { todos: todos }
  }
};

type TAllowedRoutes = {
  [key: string]: string;
  home: string;
};

type TProps = InferGetServerSidePropsType<typeof getServerSideProps>;