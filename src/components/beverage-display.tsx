"use client";
import { BeverageCard } from "./beverage-card";
import { BeverageSearchBar } from "./beverage-searchbar";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/app/state/cart";

export function BeverageDisplay({
  beverages,
}: {
  beverages: {
    id: string;
    name: string;
    volume: string;
    image: string | null;
  }[];
}) {
  const cartStore = useCartStore();
  const [search, setSearch] = useState("");


  // Filter beverages based on the search term or display all if the search term is empty
  const filteredBeverages = search
    ? beverages.filter((beverage) =>
        beverage.name.toLowerCase().includes(search.toLowerCase())
      )
    : beverages;

  return (
    <div className="mx-auto w-full">
      <BeverageSearchBar setSearch={setSearch} />
      <div
        className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center items-center w-full overflow-y-auto`}
      >
        {filteredBeverages.sort().map((beverage, idx) => (
          <BeverageCard
            key={idx}
            id={beverage.id}
            name={beverage.name}
            volume={beverage.volume}
            image={beverage.image}
            addToCart={cartStore.addItem}
          />
        ))}
      </div>
    </div>
  );
}
