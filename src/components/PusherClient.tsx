"use client";

import { useEffect } from "react";

let Pusher: any = null;

export default function PusherClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamic import to fix "not a constructor" in production
    import("pusher-js").then((module) => {
      Pusher = module.default;
      (window as any).Pusher = Pusher; // Make global for browser
      console.log("Pusher loaded successfully");
    }).catch((err) => {
      console.error("Pusher load failed:", err);
    });
  }, []);

  return <>{children}</>;
}