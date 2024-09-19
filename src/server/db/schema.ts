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
    fullName: text("full_name"),
    birthDate: int("birthDate", { mode: "timestamp" }),
    phoneNumber: text("phoneNumber"),
    email: text("email"),
    address: text("address"),
    aboutMe: text("aboutMe"),
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
  experienceStart: int("experience_start", { mode: "timestamp" }),
  experienceEnd: int("experience_end", { mode: "timestamp" }),
  experienceName: text("experience_name"),
  experienceLocation: text("experience_location"),
  experienceOrganism: text("experience_organism"),
  experienceAbout: text("experience_about"),
});

export const degreeTable = createTable("degree", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
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
  linkURL: text("link_url"),
  linkName: text("link_name"),
});

export const skillTable = createTable("skill", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  skillName: text("skill_name"),
});

export const cvTable = createTable("CV", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  cvName: text("cv_name").unique().notNull(),
  cvData: blob("cv_data"),
});
