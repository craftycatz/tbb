"use client";
import { cn } from "@/lib/utils";
import { LogOut as lg } from "@/app/actions/logout";
import { Button } from "@/components/ui/button";
import {
  Milk,
  Martini,
  ShoppingBasket,
  GanttChart,
  User,
  MessageSquare,
  Cog,
  LogOut,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function Sidebar({ className }: { className: string }) {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className={cn("pb-12 border-r-2", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathName.includes("beverages") ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => router.push("/app/beverages")}
            >
              <Milk className="mr-2 h-4 w-4" />
              Beverages
            </Button>
            <Button
              onClick={() => router.push("/app/event")}
              variant={pathName.includes("event") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Martini className="mr-2 h-4 w-4" />
              Events
            </Button>
            <Button
              variant={pathName.includes("admin") ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => router.push("/app/admin")}
            >
              <GanttChart className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Settings
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathName.includes("profile") ? "secondary" : "ghost"}
              onClick={() => router.push("/app/profile")}
              className="w-full justify-start"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant={"ghost"}
        className="w-full justify-start"
        type="submit"
        onClick={() => lg()}
      >
        <LogOut className="mr-2 h-4 w-4"></LogOut>
        Sign Out
      </Button>
    </div>
  );
}
