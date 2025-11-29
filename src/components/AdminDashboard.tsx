"use client";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Online Riders", value: "12", change: "+3 today" },
          { label: "Active Orders", value: "28", change: "Live now" },
          { label: "Today's Revenue", value: "₹18,420", change: "+18%" },
          { label: "Avg Delivery Time", value: "22 min", change: "Best in city" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <p className="text-purple-200 text-sm">{stat.label}</p>
            <p className="text-5xl font-black mt-2">{stat.value}</p>
            <p className="text-green-400 text-sm mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Live Map Placeholder */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold mb-6">Live Rider Tracking</h2>
        <div className="bg-gray-800/50 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-purple-400">
          <p className="text-2xl text-gray-300">Real-time map coming in v2</p>
        </div>
      </div>
    </div>
  );
}