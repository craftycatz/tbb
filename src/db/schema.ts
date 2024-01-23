import {
  text,
  boolean,
  json,
  timestamp,
  pgTable,
  integer,
  foreignKey,
  uniqueIndex,
  uuid,
  varchar,
  pgMaterializedView,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// type is either beverage or event
export const items = pgTable("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: text("type").$type<"beverage" | "event">().notNull(),
  image: text("image"),
  volume: text("volume").notNull(),
  active: boolean("active").notNull().default(false),
});

// Define Area table
export const areas = pgTable("areas", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

// Define BeverageOrder table
export const itemOrders = pgTable("item_orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  itemId: uuid("item_id").references(() => items.id),
  amount: integer("amount").notNull(),
  orderId: uuid("order_id").references(() => orders.id),
});

// Define Order table
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  areaId: uuid("area_id").references(() => areas.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  sendAt: timestamp("send_at"),
  status: text("status").$type<"pending" | "sent">().notNull().default("pending"),
});

export const Account = pgTable(
  "Account",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("userId").notNull(),
    type: varchar("type").notNull(),
    provider: varchar("provider").notNull(),
    providerAccountId: varchar("providerAccountId").notNull(),
    refresh_token: varchar("refresh_token"),
    access_token: varchar("access_token"),
    expires_at: timestamp("expires_at"),
    token_type: varchar("token_type"),
    scope: varchar("scope"),
    id_token: varchar("id_token"),
    session_state: varchar("session_state"),
  },
  (account) => {
    return {
      accountIdKeyIndex: uniqueIndex(
        "Account_provider_providerAccountId_key"
      ).on(account.provider, account.providerAccountId),

      userForeignKey: foreignKey({
        columns: [account.userId],
        foreignColumns: [User.id],
      }),
    };
  }
);

export const Session = pgTable(
  "Session",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionToken: varchar("sessionToken").notNull(),
    userId: uuid("userId").notNull(),
    expires: timestamp("expires").notNull(),
  },
  (session) => {
    return {
      sessionTokenKeyIndex: uniqueIndex("Session_sessionToken_key").on(
        session.sessionToken
      ),
      userForeignKey: foreignKey({
        columns: [session.userId],
        foreignColumns: [User.id],
      }),
    };
  }
);

export const User = pgTable(
  "User",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    fname: varchar("fname").notNull(),
    lname: varchar("lname").notNull(),
    email: varchar("email").notNull().unique(),
    emailVerified: timestamp("emailVerified"),
    image: varchar("image"),
    role: text("role").$type<"admin" | "user" | "eventUser">().notNull(),
    areaId: uuid("area_id")
      .notNull()
      .references(() => areas.id),
    password: text("password").notNull(),
    settings: json("settings"),
  },
  (user) => {
    return {
      userEmailKeyIndex: uniqueIndex("User_email_key").on(user.email),
    };
  }
);

export const VerificationToken = pgTable(
  "VerificationToken",
  {
    token: varchar("token").notNull(),
    identifier: varchar("identifier").notNull(),
    expires: timestamp("expires").notNull(),
  },
  (verificationToken) => {
    return {
      tokenKeyIndex: uniqueIndex("VerificationToken_token_key").on(
        verificationToken.token
      ),
      tokenIdentifierIndex: uniqueIndex("VerificationToken_identifier_key").on(
        verificationToken.identifier
      ),
    };
  }
);

export const areaRelations = relations(areas, ({ many }) => ({
  User: many(User),
}));

export const userRelations = relations(User, ({ one }) => ({
  areas: one(areas, {
    fields: [User.areaId],
    references: [areas.id],
  }),
}));

export const monthlyBeverageOrders = pgMaterializedView(
  "monthly_beverage_orders",
  {
    month: text("month").notNull(),
    totalAmount: integer("total_amount").notNull().default(0),
  }
).as(sql`
    SELECT
      TO_CHAR(${orders.createdAt}, 'YYYY-MM') AS month,
      SUM(${itemOrders.amount}) AS total_amount
    FROM
      ${itemOrders}
    JOIN
      ${orders} ON ${itemOrders.orderId} = ${orders.id}
    JOIN
      ${items} ON ${itemOrders.itemId} = ${items.id}
    WHERE
      ${items.type} = 'beverage'
    GROUP BY
      month
  `);

// Define EventOrders view
export const monthlyEventOrders = pgMaterializedView("monthly_event_orders", {
  month: text("month").notNull(),
  totalAmount: integer("total_amount").notNull().default(0),
}).as(sql`
    SELECT
      TO_CHAR(${orders.createdAt}, 'YYYY-MM') AS month,
      SUM(${itemOrders.amount}) AS total_amount
    FROM
      ${itemOrders}
    JOIN
      ${orders} ON ${itemOrders.orderId} = ${orders.id}
    JOIN
      ${items} ON ${itemOrders.itemId} = ${items.id}
    WHERE
      ${items.type} = 'event'
    GROUP BY
      month
  `);
