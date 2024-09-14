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
    <main className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </main>
  );
}

export default Page;
