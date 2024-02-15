import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";

export async function POST(req) {
  let nextQuery = true;
  const limit = 11;
  let { page, username } = await req.json();
  if (page === undefined) {
    page = 1;
  }
  await connectMongoDB();

  try {
    let users;
    if (username !== undefined) {
      users = await User.find({ username: new RegExp(username, "i") })
        .select("-password")
        .limit(limit)
        .skip((page - 1) * 10);
    } else {
      users = await User.find()
        .select("-password")
        .limit(limit)
        .skip((page - 1) * 10);
    }

    if (users[10] === undefined) {
      nextQuery = false;
    } else {
      users.pop();
    }

    return NextResponse.json({ users, nextQuery }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
