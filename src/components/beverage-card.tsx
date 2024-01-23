"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CartItem } from "@/app/state/cart";

type BeverageCardProps = {
  id: string;
  name: string;
  volume: string;
  image?: string | null;
  addToCart: (item: CartItem) => void;
  className?: string;
};

export function BeverageCard({
  name,
  id,
  volume,
  image,
  className,
  addToCart,
}: BeverageCardProps) {
  const [amount, setAmount] = useState(0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>One case x {volume} litres</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 w-64 lg:h-96 lg:w-80">
          {image ? (
            <Image
              src={image}
              alt={`Image of a bottle of ${name}`}
              layout="fill"
              sizes="100%"
              objectFit="cover"
            />
          ) : (
            <Image
              src={"/images/placeholder.svg"}
              alt={`Image of a bottle of ${name}`}
              layout="fill"
              sizes="100%"
              objectFit="cover"
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-1">
        <div className="flex flex-row justify-center items-center gap-1">
          <Button
            size={"icon"}
            onClick={() => setAmount((prev) => (prev < 50 ? prev + 1 : prev))}
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            max={50}
            min={0}
            className="w-1/2"
            value={amount}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value <= 50 && value >= 0) {
                setAmount(value);
              } else if (value < 0 || isNaN(value)) {
                setAmount(0);
              } else if (value > 50) {
                setAmount(50);
              }
            }}
          />
          <Button
            size={"icon"}
            onClick={() => setAmount((prev) => (prev > 0 ? prev - 1 : prev))}
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
        </div>
        <Button
          onClick={() => {
            addToCart({ beverage: { id, name }, quantity: amount });
            setAmount(0);
          }}
        >
          Add to Cart
          <ShoppingCart className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
