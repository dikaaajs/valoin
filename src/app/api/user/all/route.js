export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import User from "../../../../../models/user";
import connectMongoDB from "../../../../../libs/mongodb";

export async function GET() {
  try {
    connectMongoDB();
    const users = await User.find({});
    console.log(users);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
