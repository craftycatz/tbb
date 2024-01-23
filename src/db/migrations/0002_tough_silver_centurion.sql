ALTER TABLE "area" RENAME TO "areas";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "User_area_id_area_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_area_id_area_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE MATERIALIZED VIEW monthly_beverage_orders AS
  SELECT
    TO_CHAR(orders.created_at, 'YYYY-MM') AS month,
    SUM(item_orders.amount) AS total_amount
  FROM
    item_orders
  JOIN
    orders ON item_orders.order_id = orders.id
  JOIN
    items ON item_orders.item_id = items.id
  WHERE
    items.type = 'beverage'
  GROUP BY
    month;
--> statement-breakpoint
CREATE MATERIALIZED VIEW monthly_event_orders AS
  SELECT
    TO_CHAR(orders.created_at, 'YYYY-MM') AS month,
    SUM(item_orders.amount) AS total_amount
  FROM
    item_orders
  JOIN
    orders ON item_orders.order_id = orders.id
  JOIN
    items ON item_orders.item_id = items.id
  WHERE
    items.type = 'event'
  GROUP BY
    month;