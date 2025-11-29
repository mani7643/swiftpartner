"use client";

import { useEffect, useState } from "react";

export default function OrderAlert() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Connect to Pusher (free real-time service)
    const pusher = new (window as any).Pusher("2d0c2f2f8d8d8d8d8d8d", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("swiftpartner-orders");
    channel.bind("new-order", (data: any) => {
      setOrder(data);

      // Play loud sound
      const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3");
      audio.volume = 1.0;
      audio.play().catch(() => {});
    });

    return () => {
      pusher.unsubscribe("swiftpartner-orders");
    };
  }, []);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-bounce">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-4"></div>
        <div className="p-8 text-center">
          <div className="text-7xl mb-4">Bell</div>
          <h2 className="text-5xl font-black text-gray-800 mb-4">NEW ORDER!</h2>
          <p className="text-4xl font-bold text-green-600 mb-8">₹{order.amount}</p>

          <div className="text-left space-y-4 bg-gray-50 rounded-2xl p-6 text-lg">
            <p><strong>Customer:</strong> {order.customer}</p>
            <p><strong>Items:</strong> {order.items}</p>
            <p><strong>Deliver to:</strong> {order.address}</p>
            <p className="text-orange-600 font-bold text-xl">{order.distance} away</p>
          </div>

          <div className="flex gap-4 mt-10">
            <button
              onClick={() => setOrder(null)}
              className="flex-1 bg-gray-300 text-gray-800 font-bold text-xl py-6 rounded-2xl hover:bg-gray-400 transition"
            >
              REJECT
            </button>
            <button
              onClick={() => {
                alert("Order Accepted! Opening Google Maps...");
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${order.address}`, "_blank");
                setOrder(null);
              }}
              className="flex-1 bg-green-600 text-white font-black text-xl py-6 rounded-2xl hover:bg-green-700 transition shadow-2xl"
            >
              ACCEPT & NAVIGATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}