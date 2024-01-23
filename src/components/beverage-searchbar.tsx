"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";

export function BeverageSearchBar({ setSearch }: { setSearch: any }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Use a timeout to debounce the setSearchTerm function
    const timeoutId = setTimeout(() => {
      console.log("Search term:", searchTerm);
      setSearch(searchTerm);
      // Add your logic for handling the debounced search term here
    }, 500); // Adjust the debounce delay as needed (e.g., 500 milliseconds)

    // Cleanup the timeout to avoid triggering unnecessary updates
    return () => clearTimeout(timeoutId);
  }, [searchTerm, setSearch]);

  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-fore " />
      <Input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-8 m-4"
        placeholder="Search beverage..."
      />
    </div>
  );
}
