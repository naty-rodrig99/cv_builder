"use client";

import React from "react";
import { signUp } from "~/app/auth/actions";

function SignupForm() {
  return (
    <form
      action={async (formData) => {
        const result = await signUp(formData);
        if (!result.ok) {
          // Todo: Show the error to the user.
          console.error(result.error);
        }
      }}
    >
      <label htmlFor="username">Username</label>
      <input name="username" id="username" />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <br />
      <button>Continue</button>
    </form>
  );
}

export default SignupForm;
