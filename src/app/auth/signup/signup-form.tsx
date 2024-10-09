"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signUp } from "~/app/auth/actions";

interface InvalidDataProps {
  errorMessage: string;
}

function InvalidData({ errorMessage }: InvalidDataProps) {
  if (errorMessage) {
    return (
      <CardDescription className="text-red-600">{errorMessage}</CardDescription>
    );
  }
  return null;
}

function SignupForm() {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Card className="w-full max-w-sm">
      <form
        action={async (formData) => {
          const result = await signUp(formData);
          if (!result.ok) {
            // Todo: Show the error to the user.
            console.error(result.error);
            setErrorMessage(result.error.message);
          }
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter a username and choose a password to setup your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InvalidData errorMessage={errorMessage} />
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              type="username"
              autoComplete="username"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={() => setErrorMessage("")}
          >
            Sign Up
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default SignupForm;
