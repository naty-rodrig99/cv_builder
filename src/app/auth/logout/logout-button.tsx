"use client";

import React from "react";
import { logOut } from "~/app/auth/actions";

export interface LogoutButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  onLogout?: () => void;
}

function LogoutButton(props: LogoutButtonProps) {
  return (
    <button
      type="button"
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
      Logout
    </button>
  );
}

export default LogoutButton;
