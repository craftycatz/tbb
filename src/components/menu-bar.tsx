import { Menubar } from "@/components/ui/menubar";
import { ShoppingCart } from "lucide-react";
import { CartContent } from "./shopping-cart";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { auth } from "@/lib/auth";
import { db } from "@/db/client";
import { or, sql } from "drizzle-orm";
import { ThemeSwitch } from "./theme-switch";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function Menu() {
  const session = await auth();
  const user = await db.query.User.findFirst({
    where: (user, { eq }) => eq(user.email, session?.user?.email as string),
  });

  const area = await db.query.areas.findFirst({
    where: (area, { eq }) => eq(area.id, user?.areaId as string),
  });

  const areaOrders: { name: string; amount: number; area_id: string }[] =
    await db.execute(sql`
    SELECT items.name, item_orders.amount, orders.area_id
    FROM orders
    JOIN item_orders ON orders.id = item_orders.order_id
    JOIN items ON item_orders.item_id = items.id
    WHERE orders.area_id = ${area?.id} AND orders.status = 'pending'
  `);

  // every beverage should be only once in the array so if duplicate remove it and add the amount
  const orders: { name: string; amount: number }[] = areaOrders.reduce(
    (acc: { name: string; amount: number }[], curr: any) => {
      const index = acc.findIndex((item) => item.name === curr.name);
      if (index === -1) {
        acc.push({ name: curr.name, amount: curr.amount });
      } else {
        acc[index].amount += curr.amount;
      }
      return acc;
    },
    []
  );
  return (
    <Menubar className="rounded-none px-2 lg:px-4 border-none w-[80%] min-w-max fixed flex justify-between z-[1040]">
      <div className="flex flex-row gap-2 items-center">
        <h1 className="font-bold text-xl">TBeverage</h1>
        <ThemeSwitch />
      </div>
      <Sheet>
        <SheetTrigger className="hover:bg-accent hover:text-accent-foreground h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <ShoppingCart aria-hidden className="w-4 h-4" /> | {orders.length}
        </SheetTrigger>
        <SheetContent className="max-w-[35rem!important] z-[1040]">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <CartContent areaOrders={orders} areaId={user?.areaId ?? ""} />
        </SheetContent>
      </Sheet>
    </Menubar>
  );
}
