import { BeverageDisplay } from "@/components/beverage-display";
import { db } from "@/db/client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function BeveragePage() {
  const items = await db.query.items.findMany({
    where: (items, { eq }) => eq(items.active, true),
  });

  // sort items so event items are first
  const beverages = items.sort((a, b) => {
    if (a.type === "event" && b.type === "beverage") {
      return -1;
    } else if (a.type === "beverage" && b.type === "event") {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="w-full">
        <BeverageDisplay beverages={items} />
      </div>
    </main>
  );
}
