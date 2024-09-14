"use client";

import React from "react";
import { logOut } from "~/app/auth/actions";
import { Button } from "~/components/ui/button";

export interface LogoutButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  onLogout?: () => void;
}

function LogoutButton(props: LogoutButtonProps) {
  return (
    <Button
      {...props}
      onClick={async () => {
        try {
          const result = await logOut();
          if (result.ok) props.onLogout?.();
        } catch (e) {
          // Todo: Properly handle error.
          console.error(e);
        }
      }}
    >
      Log Out
    </Button>
  );
}

export default LogoutButton;
