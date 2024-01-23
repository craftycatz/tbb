"use client";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "../../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { UserSchema } from "@/app/schemas/user";
import React from "react";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "@/app/actions/create-user";
import { useUserStore } from "@/app/state/user";
import { UserPlus } from "lucide-react";

export const CreateUserButton = ({
  areasData,
}: {
  areasData: {
    id: string;
    name: string;
  }[];
}) => {
  const [error, setError] = React.useState<string | undefined>();
  const [isPending, startTransition] = React.useTransition();
  const userStore = useUserStore();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      fname: "",
      lname: "",
      areaId: "",
      role: "user",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    setError(undefined);
    startTransition(async () => {
      const { success, error } = await createUser(values);
      if (error) {
        console.log(error);
      }
      if (success) {
        if (typeof success === "object" && success.user) {
          userStore.setUser(success.user);
        }
        form.reset();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          New User <UserPlus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2>Create User</h2>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        {...formState}
                      />
                    </FormControl>
                    {formState.errors.email && (
                      <FormMessage>
                        {formState.errors.email.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="fname"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel htmlFor="fname">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="First Name"
                        {...field}
                        {...formState}
                      />
                    </FormControl>
                    {formState.errors.fname && (
                      <FormMessage>
                        {formState.errors.fname.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="lname"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel htmlFor="lname">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        {...field}
                        {...formState}
                      />
                    </FormControl>
                    {formState.errors.lname && (
                      <FormMessage>
                        {formState.errors.lname.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="areaId"
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
                            {areasData.map((area) => (
                              <SelectItem key={area.id} value={area.id}>
                                {area.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {formState.errors.areaId && (
                      <FormMessage>
                        {formState.errors.areaId.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
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
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Roles</SelectLabel>
                            {["admin", "user", "event"].map((role, idx) => (
                              <SelectItem key={idx} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {formState.errors.areaId && (
                      <FormMessage>
                        {formState.errors.areaId.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
