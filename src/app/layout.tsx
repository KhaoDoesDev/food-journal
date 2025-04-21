import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Khao's Food Journal",
  description:
    "A simple food journal app to help you track your food intake made by Khao (khaodoes.dev)",
  creator: "Khao (khaodoes.dev)",
  keywords:
    "food journal, food tracking, khao, khaodoes.dev, khaodoesdev, journal",
  icons: {
    icon: { url: "/icon.png" },
  },
  twitter: {
    card: "summary_large_image",
    title: "Khao's Food Journal",
    description:
      "A simple food journal app to help you track your food intake.",
    creator: "@KhaoIsTheBest",
  },
  alternates: {
    canonical: "https://food-journal.khaodoes.dev",
  },
};

const nunito = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(nunito.className, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
