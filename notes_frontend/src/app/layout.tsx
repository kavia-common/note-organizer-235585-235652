import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Retro Notes",
  description: "A retro-themed notes app with tags, search, and markdown editing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="retro-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
