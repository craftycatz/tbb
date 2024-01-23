import Link from "next/link";

import { cn } from "@/lib/utils";

interface adminNavProps extends React.HTMLAttributes<HTMLElement> {
  page: string;
}

export function MainNav({ className, page, ...props }: adminNavProps) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/app/admin"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          page === "overview" ? "" : "text-muted-foreground"
        }`}
      >
        Overview
      </Link>
      <Link
        href="/app/admin/users"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          page === "users" ? "" : "text-muted-foreground"
        }`}
      >
        Users
      </Link>
      <Link
        href="/app/admin/areas"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          page === "areas" ? "" : "text-muted-foreground"
        }`}
      >
        Areas
      </Link>
      <Link
        href="/app/admin/products"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          page === "products" ? "" : "text-muted-foreground"
        }`}
      >
        Products
      </Link>
    </nav>
  );
}
