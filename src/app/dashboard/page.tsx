import { currentUser } from "@clerk/nextjs/server";
import LiveMap from "@/components/LiveMap";
import UserProfileButton from "@/components/UserProfileButton";
import { getTodayEarnings } from "@/lib/earnings";
import OrderAlert from "@/components/OrderAlert";

export default async function Dashboard() {
  const user = await currentUser();
  const earnings = user ? getTodayEarnings(user.id) : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-2xl font-bold">SwiftPartner</h1>
          <p className="text-sm opacity-90">Hello, {user?.firstName || "Rider"}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs opacity-80">Today's Earnings</p>
            <p className="text-3xl font-bold">₹{earnings}</p>
            {earnings === 0 && <p className="text-sm opacity-70">Waiting for orders...</p>}
          </div>
          <UserProfileButton />
        </div>
      </header>

      <div className="bg-white p-6 text-center shadow">
        <p className="text-4xl font-bold text-green-600">ONLINE</p>
        <p className="text-gray-600 mt-2">Ready for orders</p>
      </div>

      <div className="h-[calc(100vh-220px)]">
        <LiveMap />
      </div>
      <OrderAlert />
    </div>
  );
}

