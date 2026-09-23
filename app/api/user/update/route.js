import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDb from "@/db/connectDb";
import User from "@/Models/User";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectDb();
  await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: body },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}