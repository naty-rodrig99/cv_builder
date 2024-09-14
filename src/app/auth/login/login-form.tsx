"use client";

import React from "react";
import { logIn } from "~/app/auth/actions";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        try {
          const result = await logIn(formData);
          if (result.ok) router.replace("/");
          // Todo: Properly handle error.
          else console.error(result.error);
        } catch (e) {
          // Todo: Properly handle error.
          console.error(e);
        }
      }}
    >
      <label htmlFor="username">Username</label>
      <input name="username" id="username" />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <br />
      <button>Login</button>
    </form>
  );
}

export default LoginForm;
