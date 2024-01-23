import { MainNav } from "@/components/admin/admin-nav";
import { OrderChartCard } from "@/components/admin/overview/order-chart-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/client";
import {
  monthlyBeverageOrders,
  monthlyEventOrders,
  User,
  items,
  itemOrders,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function AdminPage() {
  const monthMap: Record<number, string> = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const monthlyOrders = await db.select().from(monthlyBeverageOrders);
  const monthlyItems = await db.select().from(monthlyEventOrders);
  let formattedOrders: Array<{ month: string; amount: number }> = [];
  for (let i = 0; i < 12; i++) {
    if (monthlyOrders[i]) {
      formattedOrders.push({
        month: monthMap[i + 1],
        amount: monthlyOrders[i].totalAmount,
      });
    } else {
      formattedOrders.push({
        month: monthMap[i + 1],
        amount: Math.floor(Math.random() * 100),
      });
    }
  }

  let formattedEventOrders: Array<{ month: string; amount: number }> = [];
  for (let i = 0; i < 12; i++) {
    if (monthlyItems[i]) {
      formattedEventOrders.push({
        month: monthMap[i + 1],
        amount: monthlyItems[i].totalAmount,
      });
    } else {
      formattedEventOrders.push({
        month: monthMap[i + 1],
        amount: Math.floor(Math.random() * 100),
      });
    }
  }

  const ordersCurrentYear = monthlyOrders.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );

  console.log(monthlyOrders);

  const countUsers = await db
    .select({
      count: sql`COUNT(*)`,
    })
    .from(User);

  const countBeverages = await db
    .select({
      count: sql`COUNT(*)`,
    })
    .from(items)
    .where(eq(items.active, true) && eq(items.type, "beverage"));

  const countEvents = await db
    .select({
      count: sql`COUNT(*)`,
    })
    .from(items)
    .where(eq(items.active, false) && eq(items.type, "event"));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 space-y-6">
      <div className="w-full space-y-6">
        <MainNav page="overview" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">
                Orders for {new Date().getFullYear()}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Total beverages orderd
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ordersCurrentYear}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">
                Active Users
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Total active users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {countUsers[0].count as number}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">
                Active Beverages
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Total active beverages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {countBeverages[0].count as number}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">
                Active Event items
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Total active event items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {countEvents[0].count as number}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex space-x-2">
          <OrderChartCard
            formattedOrders={formattedOrders}
            title="Beverages"
            description="Beverages orderd for each month"
          />
          <OrderChartCard
            formattedOrders={formattedEventOrders}
            title="Events"
            description="Event items orderd for each month"
          />
        </div>
      </div>
    </main>
  );
}
