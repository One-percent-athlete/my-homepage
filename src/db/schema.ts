import { boolean, pgTable, uuid, serial, text, uniqueIndex, varchar, timestamp } from "drizzle-orm/pg-core";

// Posts table (already exists)
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  videoUrl: text("video_url"),
  category: varchar("category", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Comments table
export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pikminDecorItems = pgTable("pikmin_decor_items", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 120 }).notNull(),
  decor: varchar("decor", { length: 160 }).notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  owned: boolean("owned").default(false).notNull(),
  event: boolean("event").default(false).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [uniqueIndex("pikmin_decor_identity").on(table.category, table.decor, table.color)]);
