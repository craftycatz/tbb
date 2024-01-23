import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres("postgres://postgres:postgres@localhost/tbb", {
  max: 1,
});

const runMigration = async () => {
  const start = Date.now();
  console.log("Running migrations...");

  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/db/migrations",
  });

  const end = Date.now();
  console.log(`Migrations completed in ${end - start}ms`);
};

runMigration().then(() => process.exit(0));
