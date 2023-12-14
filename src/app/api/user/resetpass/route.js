import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { oldPassword, newPassword, email } = await request.json();
  console.log(oldPassword);

  try {
    await connectMongoDB();
    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    console.log(passwordMatch);

    if (passwordMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return NextResponse.json(
        { message: "berhasil mengganti password" },
        { status: 201 }
      );
    } else if (!passwordMatch) {
      return NextResponse.json(
        { message: "password lama invalid" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "gagal mengganti password" },
      { status: 400 }
    );
  } catch (error) {
    console.log(error.message);
  }
}
