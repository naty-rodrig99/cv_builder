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
import { logIn } from "~/app/auth/actions";
import { useRouter, useSearchParams } from "next/navigation";

interface InvalidDataProps {
  errorMessage: string;
}

function DisplayInvalidDataError({ errorMessage }: InvalidDataProps) {
  if (errorMessage) {
    return (
      <CardDescription className="text-red-600">{errorMessage}</CardDescription>
    );
  }
  return null;
}

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const search = useSearchParams();

  const onSubmit = async (formData: FormData) => {
    try {
      const result = await logIn(formData);
      const redirectUrl = search.get("redirectTo") || "/";
      if (result.ok) router.replace(redirectUrl);
      else {
        console.error(result.error);
        setErrorMessage(result.error.message);
      }
    } catch (e) {
      // Todo: Properly handle likely network error.
      console.error(e);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <form action={onSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password below to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <DisplayInvalidDataError errorMessage={errorMessage} />
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
            Log In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default LoginForm;
