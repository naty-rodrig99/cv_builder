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
    <>
      <h1>Create an account</h1>
      <SignupForm />
    </>
  );
}

export default Page;
