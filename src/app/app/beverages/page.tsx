import { BeverageDisplay } from "@/components/beverage-display";
import { db } from "@/db/client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function BeveragePage() {
  const beverages = await db.query.items.findMany({
    where: (beverages, { eq }) =>
      eq(beverages.active, true) && eq(beverages.type, "beverage"),
  });


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="w-full">
        <BeverageDisplay beverages={beverages} />
      </div>
    </main>
  );
}
