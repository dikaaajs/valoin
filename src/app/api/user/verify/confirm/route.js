import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../libs/mongodb";
import User from "../../../../../../models/user";

export async function POST(request) {
  await connectMongoDB();
  const { token, email } = await request.json();

  try {
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "invalid token" }, { status: 400 });
    }

    if (!user.tag.includes("verified")) {
      user.tag = [...user.tag, "verified"];
    }
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "berhasil verifikasi" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
