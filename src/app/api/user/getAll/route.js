import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";

export async function POST(req) {
  const limit = 10;
  let { page, username } = await req.json();
  if (page === undefined) {
    page = 1;
  }
  await connectMongoDB();

  try {
    const users = await User.find()
      .select("-password")
      .limit(limit)
      .skip((page - 1) * limit);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
