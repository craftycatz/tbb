import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

//fix too many clients error
declare global {
  var db: PostgresJsDatabase<typeof schema>;
}

const queryClient = postgres("postgres://postgres:postgres@localhost/tbb");

const drizzleDbClient = drizzle(queryClient, { schema });

// let db: PostgresJsDatabase<typeof schema>;

// if (process.env.NODE_ENV === "production") {
//   db = drizzleDbClient;
// } else {
//   if (!global.db) {
//     global.db = drizzleDbClient;
//   }

//   db = global.db;
// }

// export { db };

export { drizzleDbClient as db };
