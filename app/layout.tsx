
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clock — Your Personal Time Space",
  description:
    "A modern personal clock dashboard with digital clock, analog clock, calendar, world clock, stopwatch and countdown timer.",
  applicationName: "Clock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
