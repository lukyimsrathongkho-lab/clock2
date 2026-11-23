
import "./globals.css";

export const metadata = {
  title: "Clock UI - Time Dashboard",
  description: "A beautiful clock and time dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
