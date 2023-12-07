export const dynamic = "static";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connectMongoDB();
  try {
    const { username, email, password, deskripsi, pp, tag, id } =
      await request.json();

    // middlewere
    if (
      username !== undefined ||
      email !== undefined ||
      password !== undefined ||
      tag !== undefined
    ) {
    }

    const res = await User.updateOne(
      { _id: id },
      { $set: { deskripsi, username, pp } }
    );
    return NextResponse.json({ currentUsername: username }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
