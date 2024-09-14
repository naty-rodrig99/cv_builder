import React from "react";
import { getUser } from "~/server/user";
import { redirect } from "next/navigation";
import LoginForm from "~/app/auth/login/login-form";

async function Page() {
  const user = await getUser();

  if (user) {
    redirect("/");
  }

  return (
    <>
      <h1>Log into your account</h1>
      <LoginForm />
    </>
  );
}

export default Page;
