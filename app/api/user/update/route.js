import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDb from "@/db/connectDb";
import User from "@/Models/User";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, username, profilePic, coverPic } = body; // whitelist only

    await connectDb();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { name, username, profilePic, coverPic } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}