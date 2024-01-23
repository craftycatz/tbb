"use clinet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/ui/form-error";
import { EditUserSchema } from "@/app/schemas/user";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import router from "next/router";
import { updateProfile } from "@/app/actions/update-profile";

const EditUserForm = ({
  userEmail,
  userRole,
}: {
  userEmail: string;
  userRole: string;
}) => {
  const [error, setError] = React.useState<string | undefined>();
  const [isPending, startTransition] = React.useTransition();
  const [areas, setAreas] = React.useState<Array<{ id: string; name: string }>>(
    []
  );
  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      email: userEmail,
      area: "",
      role: userRole as "user" | "admin" | "eventUser",
    },
  });

  const getAreas = async () => {
    const response = await fetch("/api/areas");
    const data = await response.json();
    return data;
  };

  React.useEffect(() => {
    getAreas().then((areas) => {
      setAreas(areas);
    });
  }, []);

  const onSubmit = async (values: z.infer<typeof EditUserSchema>) => {
    setError(undefined);
    startTransition(async () => {
      console.log(values);
      const { error, success } = await updateProfile(values);
      if (error) {
        setError(error);
      } else {
        setError(undefined);
        form.reset();
      }
    });
  };

  const roles = [
    { role: "user", value: "user" },
    { role: "admin", value: "admin" },
    { role: "event", value: "eventUser" },
  ];

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              name="role"
              control={form.control}
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      {...formState}
                      onValueChange={field.onChange}
                      defaultValue={userRole}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          {roles.map((role, idx) => (
                            <SelectItem key={idx} value={role.value}>
                              {role.role}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {formState.errors.role && (
                    <FormMessage>{formState.errors.role.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="area"
              control={form.control}
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="areaId">Area</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      {...formState}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Areas</SelectLabel>
                          {areas.map((area) => (
                            <SelectItem key={area.id} value={area.id}>
                              {area.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {formState.errors.area && (
                    <FormMessage>{formState.errors.area.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <FormError error={error} />
          <Button type="submit" className="w-full">
            Edit User
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditUserForm;
