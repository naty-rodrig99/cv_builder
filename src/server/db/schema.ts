// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  int,
  sqliteTableCreator,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `cv-builder_${name}`);

/**
 * User and Session tables must at least conform to Lucia's required schema:
 * https://lucia-auth.com/database/drizzle
 * https://lucia-auth.com/tutorials/username-and-password/nextjs-app
 */

export const userTable = createTable(
  "user",
  {
    id: text("id").primaryKey(),
    username: text("username").unique().notNull(),
    passwordHash: text("password_hash").unique().notNull(),
  },
  (table) => ({
    usernameUniqueIndex: uniqueIndex("usernameUniqueIndex").on(table.username),
  }),
);

export const sessionTable = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: int("expires_at").notNull(),
});

// Example table
export const postTable = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
