import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "src/db/migrations",
  schema: "src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgres://postgres:postgres@localhost:5432/tbb",
  },
  verbose: true,
  strict: true,
});
