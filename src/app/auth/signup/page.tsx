import React from "react";
import SignupForm from "~/app/auth/signup/signup-form";
import { getUser } from "~/server/user";
import { redirect } from "next/navigation";

async function Page() {
  const user = await getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <SignupForm />
    </div>
  );
}

export default Page;
