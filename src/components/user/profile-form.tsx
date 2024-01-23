"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { User, areas } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { updateProfile } from "@/app/actions/update-profile";
import { useRouter } from "next/navigation";

const profileFormSchema = z.object({
  email: z.string().email(),
  area: z.string({
    required_error: "Please select an area to order.",
  }),
  role: z.enum(["admin", "user", "eventUser"]),
});

export function ProfileForm({
  userEmail,
  userRole,
  userAreaId,
  areaData,
}: {
  userEmail: string;
  userRole: string;
  userAreaId: string;
  areaData: Array<InferSelectModel<typeof areas>>;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      email: userEmail,
      area: "",
      role: userRole as "admin" | "user" | "eventUser",
    },
  });

  const router = useRouter();

  function onSubmit(data: z.infer<typeof profileFormSchema>) {
    startTransition(async () => {
      const { error, success } = await updateProfile(data);
      if (error) {
        console.log(error);
        return;
      }
      form.reset();
      router.push("/app/profile");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={userEmail} {...field} />
              </FormControl>
              <FormDescription>
                Your email address is used to send you important notifications,
                including order confirmations and notices about your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input
                  placeholder={userRole}
                  defaultValue={userRole}
                  {...field}
                  disabled
                />
              </FormControl>
              <FormDescription>
                Your role is used to determine what you can do on the platform.
                To change your role, please contact an administrator.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        areaData.find((area) => area.id === userAreaId)?.name ??
                        "Select an Area"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {areaData.map((area) => (
                    <SelectItem
                      key={area.id}
                      value={area.id}
                      className={cn(
                        "flex items-center justify-between",
                        area.id === field.value && "bg-primary-foreground"
                      )}
                    >
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the area you want to order for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Update profile
        </Button>
      </form>
    </Form>
  );
}
