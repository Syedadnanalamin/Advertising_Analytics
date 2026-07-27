import "./globals.css";

export const metadata = {
  title: "Boost House Agency | Campaign Insights",
  description: "Real-time performance tracking and insights dashboard for Boost House Agency campaigns.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen min-w-full bg-[#0b0b0f] text-[#f4f4f6] antialiased">
        {children}
      </body>
    </html>
  );
}
