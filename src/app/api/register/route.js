export const dynamic = "static";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import Stats from "../../../../models/stats";

export async function POST(request) {
  try {
    const { username, email, password, deskripsi, pp, tag } =
      await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      deskripsi,
      pp,
      tag,
    });
    await Stats.create({
      lineupDibuat: 0,
      lineupTerpilih: 0,
      disukai: 0,
      idUser: user._id,
    });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
