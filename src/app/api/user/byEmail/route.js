export const dynamic = "static";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ msg: error.message });
  }
}
