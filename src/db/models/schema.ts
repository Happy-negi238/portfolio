import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  serial,
} from 'drizzle-orm/pg-core';

export const admins = pgTable('admins', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: varchar('full_name', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  salt: varchar('salt', { length: 18 }).notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  techStack: text('tech_stack').array().notNull(),
  githubLink: text('github_link'),
  deployLink: text('deploy_link'),
  image: text('image'),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const contacts = pgTable('contacts', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phoneNo: varchar('phone_no', { length: 20 }),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const visitors = pgTable('visitors', {
  id: serial('id').primaryKey(),
  visitorId: varchar('visitor_id', {length: 255}).unique().notNull(),
  visits: integer('visits').default(1).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastVisit: timestamp('last_visit').defaultNow().notNull(),
});
