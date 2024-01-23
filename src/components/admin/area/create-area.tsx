"use client";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
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
import React from "react";
import { createArea } from "@/app/actions/create-area";
import { useAreaStore } from "@/app/state/area";
import { LandPlot, UserPlus } from "lucide-react";
import { AreaSchema } from "@/app/schemas/area";

export const CreateAreaButton = () => {
  const [error, setError] = React.useState<string | undefined>();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof AreaSchema>>({
    resolver: zodResolver(AreaSchema),
    defaultValues: {
      name: "",
    },
  });

  const areaStore = useAreaStore();

  const onSubmit = async (values: z.infer<typeof AreaSchema>) => {
    setError(undefined);
    startTransition(async () => {
      const { success, error } = await createArea(values);
      if (error) {
        console.log(error);
      }
      if (success) {
        if (typeof success === "object" && success.area) {
          areaStore.setArea(success.area);
        }
        form.reset();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          New Area <LandPlot className="ml-2 h-4 w-4" />
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
                name="name"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Area name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Area"
                        {...field}
                        {...formState}
                      />
                    </FormControl>
                    {formState.errors.name && (
                      <FormMessage>{formState.errors.name.message}</FormMessage>
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
