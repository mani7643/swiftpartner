// src/app/admin/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminPage() {
  const user = await currentUser();

  // ONLY YOU CAN ENTER — change this email if needed
  const allowedEmail = "manindraachanta7643@gmail.com"; // ← your email

  if (!user || user.emailAddresses[0]?.emailAddress !== allowedEmail) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-7xl font-black mb-4">SwiftPartner Admin</h1>
          <p className="text-3xl opacity-90">Welcome back, {user.firstName || "Boss"} 👑</p>
        </div>
        <AdminDashboard />
      </div>
    </div>
  );
}