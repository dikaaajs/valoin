export const dynamic = "static";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB("auth");
    const { username } = await req.json();
    const user = await User.findOne({ username });
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error.message);
  }
}
