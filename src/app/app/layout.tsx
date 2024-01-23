import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/sidebar";
import { Menu } from "@/components/menu-bar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <section className="flex flex-row">
            <Sidebar className="w-64 min-w-min max-w-max fixed left-0 h-full" />
            <div className="w-full pl-64">
              <Menu />
              {children}
            </div>
          </section>
        </Providers>
      </body>
    </html>
  );
}
