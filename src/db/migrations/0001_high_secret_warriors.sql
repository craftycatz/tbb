ALTER TABLE "areas" RENAME TO "area";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "User_area_id_areas_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_area_id_areas_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_area_id_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_area_id_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
