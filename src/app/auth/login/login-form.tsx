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
import { useRouter } from "next/navigation";


function InvalidData({ errorMessage }: { errorMessage: string }): React.JSX.Element | null {
  if (errorMessage) {
    return <CardDescription className="text-red-600">{errorMessage}</CardDescription>;
  }
  return null
}

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  return (
    <Card className="w-full max-w-sm">
      <form
        action={async (formData) => {
          console.log(formData);
          try {
            const result = await logIn(formData);
            if (result.ok) router.replace("/");
            else {
              console.error(result.error);
              setErrorMessage(result.error.message);
            }
          } catch (e) {
            // Todo: Properly handle error.
            console.error(e);
          }
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password below to log in to your account.
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
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default LoginForm;
