"use client";

import { useEffect } from "react";

interface Order {
  id: string;
  restaurant: string;
  restaurantAddress: string;
  customer: string;
  customerAddress: string;
  items: string;
  amount: number;
}

export default function OrderAlert({
  order,
  onAccept,
  onReject,
}: {
  order: Order;
  onAccept: () => void;
  onReject: () => void;
}) {
  useEffect(() => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-alarm-tone-1055.mp3");
    audio.play().catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="bg-red-600 text-white p-6 text-center">
          <h2 className="text-3xl font-bold">NEW ORDER!</h2>
          <p className="text-2xl mt-2">₹{order.amount}</p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-gray-600 text-sm">Pick up from</p>
            <p className="text-xl font-bold">{order.restaurant}</p>
            <p className="text-gray-700">{order.restaurantAddress}</p>
          </div>

          <div className="border-t pt-6">
            <p className="text-gray-600 text-sm">Deliver to</p>
            <p className="text-xl font-bold">{order.customer}</p>
            <p className="text-gray-700">{order.customerAddress}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="font-semibold">Items:</p>
            <p>{order.items}</p>
          </div>
        </div>

        <div className="flex">
          <button
            onClick={onReject}
            className="flex-1 bg-gray-300 py-5 text-xl font-bold hover:bg-gray-400"
          >
            REJECT
          </button>
          <button
            onClick={onAccept}
            className="flex-1 bg-green-600 text-white py-5 text-xl font-bold hover:bg-green-700"
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  );
}