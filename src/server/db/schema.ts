// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  blob,
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
    createdAt: int("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: int("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    fullName: text("full_name"),
    birthDate: int("birth_date", { mode: "timestamp" }),
    phoneNumber: text("phone_number"),
    email: text("email"),
    address: text("address"),
    aboutMe: text("about_me"),
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

export const workExperienceTable = createTable("workExperience", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  jobStart: int("job_start", { mode: "timestamp" }),
  jobEnd: int("job_end", { mode: "timestamp" }),
  company: text("company"),
  jobTitle: text("job_title"),
  jobLocation: text("job_location"),
  jobDescription: text("job_description"),
});

export const ExperienceTable = createTable("Experience", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  experienceStart: int("experience_start", { mode: "timestamp" }),
  experienceEnd: int("experience_end", { mode: "timestamp" }),
  experienceName: text("experience_name"),
  experienceLocation: text("experience_location"),
  experienceOrganization: text("experience_organization"),
  experienceAbout: text("experience_about"),
});

export const degreeTable = createTable("degree", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  degreeStart: int("degree_start", { mode: "timestamp" }),
  degreeEnd: int("degree_end", { mode: "timestamp" }),
  degreeName: text("degree_name"),
  universityLocation: text("university_location"),
  university: text("university"),
  degreeAbout: text("degree_about"),
});

export const projectTable = createTable("project", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  projectStart: int("project_start", { mode: "timestamp" }),
  projectEnd: int("project_end", { mode: "timestamp" }),
  projectName: text("project_name"),
  projectAbout: text("project_about"),
});

export const linkTable = createTable("link", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  linkURL: text("link_url"),
  linkName: text("link_name"),
});

export const skillTable = createTable("skill", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  skillName: text("skill_name"),
});

export const cvTable = createTable("CV", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  cvName: text("cv_name").notNull(),
  cvData: text("cv_data", { mode: "json" }),
});

export const templateTable = createTable("template", {
  id: text("id").primaryKey(),
  authorId: text("author_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  templateName: text("template_name").unique().notNull(),
  templateData: blob("cv_data"),
});

export const starredTemplateTable = createTable("starred_template", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  templateId: text("template_id")
    .notNull()
    .references(() => templateTable.id),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
