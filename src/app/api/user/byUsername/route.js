export const dynamic = "static";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB("auth");
    const { username } = await req.json();
    const user = await User.findOne({ username })
    return NextResponse.json({ user }, {status: 200})
  } catch (error) {
    return NextResponse.json({ err: error.message }, {status: 500})

  }
}
