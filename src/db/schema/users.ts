import { pgTable, serial, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt", { precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3 }).notNull(),
  email: text("email").notNull().unique(),
  name: text("name"),
});