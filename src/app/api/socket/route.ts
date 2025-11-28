import { Server } from "socket.io";
import { NextRequest } from "next/server";
import io from "@/server/socket";

export async function GET(req: NextRequest) {
  return new Response("Socket.io server running", { status: 200 });
}

export async function POST(req: NextRequest) {
  return new Response("Socket.io server running", { status: 200 });
}

// This is required for Next.js API routes with WebSockets
export const dynamic = "force-dynamic";