"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import LiveMap from "@/components/LiveMap";
import OrderAlert from "@/components/OrderAlert";
import { useRiderStore } from "@/store/useRiderStore";
import { io } from "socket.io-client";
import Link from "next/link";

export default function Dashboard() {
  const { isOnline, currentOrder, setCurrentOrder, acceptOrder, setOnline } = useRiderStore();

  useEffect(() => {
    if (!isOnline) return;

    const socket = io();
    socket.on("new-order", (order: any) => {
      setCurrentOrder(order);
    });
    return () => socket.disconnect();
  }, [isOnline, setCurrentOrder]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 pb-20 relative">
        <header className="bg-green-600 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">SwiftPartner</h1>
            <p>Rider</p>
          </div>
          <UserButton />
        </header>

        <div className="flex justify-center p-6 bg-gray-100">
  <button
    onClick={() => setOnline(!isOnline)}
    className={`px-16 py-8 rounded-3xl text-4xl font-bold shadow-2xl transition-all transform hover:scale-105 ${
  isOnline
    ? "bg-green-500 text-white animate-pulse ring-4 ring-green-300"
    : "bg-gray-400 text-gray-800"
}`}
  >
    {isOnline ? "ONLINE" : "GO ONLINE"}
  </button>
</div>
        <div className="h-[calc(100vh-280px)] mt-4">
          <LiveMap />
        </div>

        {currentOrder && (
          <OrderAlert
            order={currentOrder}
            onAccept={() => {
              acceptOrder(currentOrder);
              setCurrentOrder(null);
            }}
            onReject={() => setCurrentOrder(null)}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around items-center h-16">
        <Link href="/dashboard" className="flex-1 text-center">
          <div className="text-green-600 font-bold text-lg">Home</div>
        </Link>
        <Link href="/history" className="flex-1 text-center">
          <div className="text-gray-600 font-bold text-lg">History</div>
        </Link>
      </nav>
    </>
  );
}