// src/auth.ts
import { Lucia, TimeSpan } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "~/server/db";
import { sessionTable, userTable } from "~/server/db/schema";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(4, "w"), // 4 weeks
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },

  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
}
