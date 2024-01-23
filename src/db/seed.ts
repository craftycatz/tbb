import { db } from "./client";
import { items, areas, User } from "./schema";
import { type InferInsertModel } from "drizzle-orm";
import * as bcrypt from "bcryptjs";

async function seed() {
  try {
    // Generate 20 different beverages

    const areaData = Array.from({ length: 20 }, (_, index) => ({
      name: `Area ${index + 1}`,
    })) satisfies InferInsertModel<typeof areas>[];

    await db.insert(areas).values(areaData);
    const areaId = await db.query.areas.findFirst().then((area) => area?.id);
    const hashedPassword = await bcrypt.hash("password", 10);
    const usersData = Array.from(
      { length: 20 },
      (_, index) =>
        ({
          fname: `User ${index + 1}`,
          lname: `User ${index + 1}`,
          email: `user${index + 1}@test.com`,
          emailVerified: new Date("2021-08-01"),
          image: null,
          role: "admin",
          password: hashedPassword,
          areaId,
          settings: {},
        } as any)
    ) satisfies InferInsertModel<typeof User>[];

    const beveragesData = Array.from({ length: 50 }, (_, index) => ({
      name: `Beverage ${index + 1}`,
      image: null,
      type: index % 2 === 0 ? "beverage" : "event",
      volume: `${(index + 1) * 100}`,
      active: index % 2 === 0, // Alternate between true and false
    })) satisfies InferInsertModel<typeof items>[];

    await db.insert(items).values(beveragesData);
    await db.insert(User).values(usersData);
    console.log("Seeder script executed successfully!");
  } catch (error) {
    console.error("Error executing seeder script:", (error as Error).message);
  }
}

seed().then(() => process.exit(0));
