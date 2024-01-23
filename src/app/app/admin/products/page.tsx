import { MainNav } from "@/components/admin/admin-nav";
import { StateWrapper } from "@/components/admin/products/state-wrapper";
import { db } from "@/db/client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function ProductsPage() {
  const items = await db.query.items.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 space-y-6">
      <div className="w-full space-y-6">
        <MainNav page="products" />
        <StateWrapper data={items} />
      </div>
    </main>
  );
}
