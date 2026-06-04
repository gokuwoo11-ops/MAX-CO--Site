import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAX & Co | Private School Project Studio",
  description:
    "Premium assignment formatting, project records, diagrams, charts, PDF-ready presentation support, and private website chat."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
