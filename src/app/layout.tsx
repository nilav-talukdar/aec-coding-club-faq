import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/ui/context/query-client";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AEC Coding Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={`${nunito.className} antialiased`}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </QueryProvider>
  );
}
