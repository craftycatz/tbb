import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/user/profile-form";
import { db } from "@/db/client";
import { auth } from "@/lib/auth";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function ProfilePage() {
  const session = await auth();
  const user = await db.query.User.findFirst({
    where: (user, { eq }) => eq(user.email, session?.user?.email ?? ""),
  });

  const areas = await db.query.areas.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 space-y-6 min-w-screen">
      <div className="space-y-6 min-w-full">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">Update your Profile.</p>
        </div>
        <Separator />
        <ProfileForm
          userEmail={session?.user?.email ?? ""}
          userRole={user?.role ?? "Unknown"}
          areaData={areas}
          userAreaId={user?.areaId ?? ""}
        />
      </div>
    </main>
  );
}
