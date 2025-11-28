"use client";

import { useRiderStore } from "@/store/useRiderStore";

export default function History() {
  const { acceptedOrders, earnings } = useRiderStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">Today's Earnings</h1>
        <p className="text-5xl font-bold mt-4">₹{earnings}</p>
        <p className="mt-2">{acceptedOrders.length} orders completed</p>
      </header>

      <div className="p-4 space-y-4">
        {acceptedOrders.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No orders yet. Go online!</p>
        ) : (
          acceptedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-5 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{order.restaurant}</p>
                  <p className="text-gray-600">{order.customer}</p>
                </div>
                <p className="text-2xl font-bold text-green-600">₹{order.amount}</p>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                {new Date(order.acceptedAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
    
  );
}