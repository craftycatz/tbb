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
import React, { BaseSyntheticEvent } from "react";
import { createItem } from "@/app/actions/create-item";
import { PackagePlus } from "lucide-react";
import { ProductSchema } from "@/app/schemas/product";

export const CreateProdcutButton = () => {
  const [error, setError] = React.useState<string | undefined>();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      volume: "",
      type: "beverage",
      image: null,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ProductSchema>,
    event: BaseSyntheticEvent<any, any> | undefined
  ) => {
    const formData = new FormData(event?.target as HTMLFormElement);
    setError(undefined);

    startTransition(async () => {
      const { data, error } = await createItem(formData);
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          New Item <PackagePlus className="ml-2 h-4 w-4" />
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
                    <FormLabel htmlFor="name">Name</FormLabel>
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
              <FormField
                name="volume"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel htmlFor="volume">Volume</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Volume"
                        {...field}
                        {...formState}
                      />
                    </FormControl>
                    {formState.errors.volume && (
                      <FormMessage>
                        {formState.errors.volume.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="type"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel htmlFor="type">type</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="type"
                        {...field}
                        {...formState}
                      />
                    </FormControl>
                    {formState.errors.type && (
                      <FormMessage>{formState.errors.type.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="image"
                control={form.control}
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel htmlFor="image">Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="image"
                        {...field}
                        {...formState}
                      />
                    </FormControl>
                    {formState.errors.image && (
                      <FormMessage>
                        {formState.errors.image.message as string}
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
