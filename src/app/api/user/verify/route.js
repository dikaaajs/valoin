import { NextResponse } from "next/server";
import { sendEmail } from "../../../../../libs/sendEmail";

export async function POST(request) {
  const { email, purpose, id } = await request.json();
  sendEmail(email, purpose, id);
  NextResponse.json({ message: "berhasil mengirim token" }, { status: 200 });
}
