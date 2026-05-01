import { NextResponse } from "next/server";
import { getCurrentUser, destroySession } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, image: user.image },
  });
}

export async function POST() {
  await destroySession();
  return NextResponse.json({ success: true });
}
