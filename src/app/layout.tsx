import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwiftPartner - Delivery Rider App",
  description: "Real-time delivery tracking and earnings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Pusher script for real-time (loads only if needed) */}
          <script src="https://js.pusher.com/8.2/pusher.min.js" async defer />
          {/* Google Maps script (loads only if needed) */}
          {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
            <script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`}
              async
              defer
            />
          )}
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}