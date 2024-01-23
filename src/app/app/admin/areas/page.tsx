import { MainNav } from "@/components/admin/admin-nav";
import { db } from "@/db/client";
import { StateWrapper } from "@/components/admin/area/state-wrapper";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function AreasPage() {
  const areas = await db.query.areas.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 space-y-6">
      <div className="w-full space-y-6">
        <MainNav page="areas" />
        <StateWrapper data={areas} />
      </div>
    </main>
  );
}
